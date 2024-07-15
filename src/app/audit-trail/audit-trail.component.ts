import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../Supabase/supabase.service';

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.css']
})
export class AuditTrailComponent implements OnInit {
  auditLogs: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.fetchAuditLogs();
  }

  async fetchAuditLogs() {
    try {
      const logs = await this.supabaseService.getAuditLogs();
      this.auditLogs = logs.map(log => ({
        ...log,
        user: log.user || 'Unknown User',
        ip_address: log.ip_address || 'N/A',
        affected_page: log.affected_page || 'N/A',
        parameter: log.parameter || 'N/A',
        old_value: log.old_value || 'N/A',
        new_value: log.new_value || 'N/A',
      }));
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  }

  // Example method to log an action
  async logUserAction(userId: number, action: string) {
    try {
      await this.supabaseService.logAction(userId, action);
      // Optionally, refresh the audit logs after logging a new action
      await this.fetchAuditLogs();
    } catch (error) {
      console.error('Error logging user action:', error);
      // Handle the error appropriately
    }
  }
}