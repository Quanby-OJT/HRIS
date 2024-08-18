import { Component } from '@angular/core';
import { SupabaseService } from '../Supabase/supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-back3',
  standalone: true,
  templateUrl: './test-back3.component.html',
  styleUrls: ['./test-back3.component.css'],
  imports: [FormsModule],
})
export class TestBack3Component {
  // Define form fields for educational background
  elementaryNameOfSchool: string = '';
  elementaryBasicEducationDegreeCourse: string = '';
  elementaryPeriodOfAttendanceFrom?: Date;
  elementaryPeriodOfAttendanceTo?: Date;
  elementaryHighestLevelUnitsEarned: string = '';
  elementaryYearGraduated?: number;
  elementaryScholarshipHonorsReceived: string = '';

  secondaryNameOfSchool: string = '';
  secondaryBasicEducationDegreeCourse: string = '';
  secondaryPeriodOfAttendanceFrom?: Date;
  secondaryPeriodOfAttendanceTo?: Date;
  secondaryHighestLevelUnitsEarned: string = '';
  secondaryYearGraduated?: number;
  secondaryScholarshipHonorsReceived: string = '';

  vocationalNameOfSchool: string = '';
  vocationalBasicEducationDegreeCourse: string = '';
  vocationalPeriodOfAttendanceFrom?: Date;
  vocationalPeriodOfAttendanceTo?: Date;
  vocationalHighestLevelUnitsEarned: string = '';
  vocationalYearGraduated?: number;
  vocationalScholarshipHonorsReceived: string = '';

  collegeNameOfSchool: string = '';
  collegeBasicEducationDegreeCourse: string = '';
  collegePeriodOfAttendanceFrom?: Date;
  collegePeriodOfAttendanceTo?: Date;
  collegeHighestLevelUnitsEarned: string = '';
  collegeYearGraduated?: number;
  collegeScholarshipHonorsReceived: string = '';

  graduateNameOfSchool: string = '';
  graduateBasicEducationDegreeCourse: string = '';
  graduatePeriodOfAttendanceFrom?: Date;
  graduatePeriodOfAttendanceTo?: Date;
  graduateHighestLevelUnitsEarned: string = '';
  graduateYearGraduated?: number;
  graduateScholarshipHonorsReceived: string = '';

  constructor(private supabaseService: SupabaseService) {}

  submitForm() {
    // Helper function to format dates
    const formatDate = (date?: Date | string | number) => {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      } else if (typeof date === 'string' || typeof date === 'number') {
        const formattedDate = new Date(date);
        return !isNaN(formattedDate.getTime()) ? formattedDate.toISOString().split('T')[0] : undefined;
      }
      return undefined;
    };

    // Format date fields
    const formData = {
      elementary_name_of_school: this.elementaryNameOfSchool,
      elementary_basic_education_degree_course: this.elementaryBasicEducationDegreeCourse,
      elementary_period_of_attendance_from: formatDate(this.elementaryPeriodOfAttendanceFrom),
      elementary_period_of_attendance_to: formatDate(this.elementaryPeriodOfAttendanceTo),
      elementary_highest_level_units_earned: this.elementaryHighestLevelUnitsEarned,
      elementary_year_graduated: this.elementaryYearGraduated,
      elementary_scholarship_honors_received: this.elementaryScholarshipHonorsReceived,

      secondary_name_of_school: this.secondaryNameOfSchool,
      secondary_basic_education_degree_course: this.secondaryBasicEducationDegreeCourse,
      secondary_period_of_attendance_from: formatDate(this.secondaryPeriodOfAttendanceFrom),
      secondary_period_of_attendance_to: formatDate(this.secondaryPeriodOfAttendanceTo),
      secondary_highest_level_units_earned: this.secondaryHighestLevelUnitsEarned,
      secondary_year_graduated: this.secondaryYearGraduated,
      secondary_scholarship_honors_received: this.secondaryScholarshipHonorsReceived,

      vocational_name_of_school: this.vocationalNameOfSchool,
      vocational_basic_education_degree_course: this.vocationalBasicEducationDegreeCourse,
      vocational_period_of_attendance_from: formatDate(this.vocationalPeriodOfAttendanceFrom),
      vocational_period_of_attendance_to: formatDate(this.vocationalPeriodOfAttendanceTo),
      vocational_highest_level_units_earned: this.vocationalHighestLevelUnitsEarned,
      vocational_year_graduated: this.vocationalYearGraduated,
      vocational_scholarship_honors_received: this.vocationalScholarshipHonorsReceived,

      college_name_of_school: this.collegeNameOfSchool,
      college_basic_education_degree_course: this.collegeBasicEducationDegreeCourse,
      college_period_of_attendance_from: formatDate(this.collegePeriodOfAttendanceFrom),
      college_period_of_attendance_to: formatDate(this.collegePeriodOfAttendanceTo),
      college_highest_level_units_earned: this.collegeHighestLevelUnitsEarned,
      college_year_graduated: this.collegeYearGraduated,
      college_scholarship_honors_received: this.collegeScholarshipHonorsReceived,

      graduate_name_of_school: this.graduateNameOfSchool,
      graduate_basic_education_degree_course: this.graduateBasicEducationDegreeCourse,
      graduate_period_of_attendance_from: formatDate(this.graduatePeriodOfAttendanceFrom),
      graduate_period_of_attendance_to: formatDate(this.graduatePeriodOfAttendanceTo),
      graduate_highest_level_units_earned: this.graduateHighestLevelUnitsEarned,
      graduate_year_graduated: this.graduateYearGraduated,
      graduate_scholarship_honors_received: this.graduateScholarshipHonorsReceived,
    };

    // Call the Supabase service to insert data
    this.supabaseService.insertEducationalBackground(formData)
      .then(response => {
        console.log('Data inserted successfully:', response);
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
  }
}
