import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use(bodyParser.json()); // To parse JSON bodies

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your preferred email service
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  // Endpoint to handle admin reply
  server.post('/api/tickets/:id/reply', async (req, res) => {
    const { id } = req.params;
    const { replyText, userEmail } = req.body;

    try {
      // Save the reply to the database (pseudo-code, replace with your logic)
      await saveReplyToDatabase(id, replyText);

      // Send email to the user
      const mailOptions = {
        from: 'your-email@example.com',
        to: userEmail,
        subject: `Reply to your ticket #${id}`,
        text: replyText,
      };

      transporter.sendMail(mailOptions, (error: any) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Failed to send email');
        }
        return res.status(200).send('Reply sent and email delivered');
      });
    } catch (error) {
      console.error('Error handling reply:', error);
      res.status(500).send('Failed to handle reply');
    }
  });

  // Function to save the reply to the database
  async function saveReplyToDatabase(id: string, replyText: string) {
    // Implement your logic to save the reply to your database
    // Example: await db.collection('tickets').updateOne({ id }, { $set: { replyText } });
  }

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
