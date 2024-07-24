import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../Supabase/supabase.service';
import { SidebarNavigationModule } from './../sidebar-navigation/sidebar-navigation.module';

interface AccessRights {
  [key: string]: boolean;
}

interface User {
  profile: string;
  name: string;
  email: string;
  password: string;
  department: string;
  position: string;
  type: string;
  status: string;
  access: boolean;
  selected?: boolean;
  dateAdded?: Date;
}

interface Employee {
  email: string;
  firstName: string;
  middleName: string;
  surname: string;
  position: string;
  department: string;
  type: string;
  photoUrl?: string; // Add a new property for photo URL
}



interface Ticket {
  id: number;
  title: string;
  email: string;
  description: string;
  status: string;
  dateTime: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
}
interface AuditLogEntry {
  user_id: string;
  action: string;
  affected_page: string;
  parameter: string;
  old_parameter: string;
  new_parameter: string;
  ip_address: string;
  date: string;
}


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarNavigationModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  // Functions for users tab
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  activeTab: string = 'users';
  showManagePopup = false;
  showAddPopup = false;
  showEditPopup = false;
  employees: any[] = [];
  roles: any[] = [];

  showAccessRightsPopup = false;
  showAddDepartmentPopup = false;
  isEditing: boolean = false;
  showModal = false;
  photoPreviewUrl: string = 'https://via.placeholder.com/200x200';;
  showPasswordGeneratedMessage: boolean = false;

  newRole = '';
  selectedRole: any = {};
  usersRights: string = 'none';
  rolesRights: string = 'none';
  supportRights: string = 'none';
  parametersRights: string = 'none';
  dailyRights: string = 'none';
  monthlyRights: string = 'none';
  weeklyRights: string = 'none';
  entriesRights: string = 'none';

popupUsersRights: string = 'none';
popupRolesRights: string = 'none';
popupSupportRights: string = 'none';
popupParametersRights: string = 'none';
popupDailyRights: string = 'none';
popupMonthlyRights: string = 'none'; 
popupWeeklyRights: string = 'none';
popupEntriesRights: string = 'none';

  newDepartment = '';
  departmentType = 'all';
  selectedDepartments: string[] = [];
  departments = ['HR', 'IT', 'Finance', 'Marketing'];

  showPhotoMessage = true; // Property to control the visibility of the message
  showFileTypeAlert = false;
  showFileSizeAlert = false;
  photoFile: File | null = null;
  

  // Functions for Support tickets tab
  paginatedTickets: Ticket[] = [];
  searchTicketTerm: string = '';
  ticket_currentPage: number = 1;
  ticket_itemsPerPage: number = 10;
  ticket_totalPages: number = 1;  

  filteredTickets: Ticket[] = []; // Array to hold the tickets after applying any filters
  selectedTickets: boolean[] = []; // Array to keep track of selected state for each ticket (true if selected, false otherwise)  
  filterOption: string = 'all'; // Default filter option

  selectedTicket: any;
  isModalVisible = false;
  replyText: string = ''; // Text for the reply
  currentUser: any; // Make sure this is set with the logged-in user's information

  employee = {
    email: '',
    password: '',
    firstname: '',
    midname: '',
    surname: '',
    position: '',
    department: '',
    type: ''
  };

  assignedEmployees: string[] = ['Kobe Bryant', 'Alice Guo', 'Carlo Sotto', 'Harry Roque'];
  showCheckboxes = false;
  logAction: any;

  addNewRole() {
    this.showCheckboxes = !this.showCheckboxes;
  }


  showRolePopup: boolean = false;
  newManageRole: string = '';
  showAssignPopup: boolean = false;
  showDeleteAssigneePopup = false
  searchRoleTerm: string = '';
  assignedUsers: any[] = [];
  assignedRole: { role_id: number; role_name: string } = { role_id: 0, role_name: '' };  // Default value
  selectedUserIds: Set<number> = new Set();

  isManageMode = false; // Add this line

  editingRoleId: number | null = null;
  originalRoleName: string | null = null;

  selectedCount: number = 0;

  deselectAllCheckboxes(): void {
    this.selectedUserIds.clear();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  }

  startEdit(role: any) {
  this.editingRoleId = role.role_id;
  this.originalRoleName = role.role_name; // Store the original name
}

cancelEdit() {
  if (this.originalRoleName !== null && this.editingRoleId) {
    const roleToEdit = this.searchroletab.find(r => r.role_id === this.editingRoleId);
    if (roleToEdit) {
      roleToEdit.role_name = this.originalRoleName; // Revert to the original name
    }
  }
  this.editingRoleId = null; // Exit edit mode
  this.originalRoleName = null; // Clear the original name
}

  toggleManageMode() { // Add this method
    this.isManageMode = !this.isManageMode;
  }

  openDeleteAssigneePopup(userId: number, roleId: number): void {
    this.currentUserId = userId;
    this.currentRoleId = roleId;
    this.showDeleteAssigneePopup = true;
  }

  async confirmDeleteAssignee(): Promise<void> {
    if (this.currentUserId !== null && this.currentRoleId !== null) {
      await this.unassignUser(this.currentUserId, this.currentRoleId);
      this.showDeleteAssigneePopup = false;
      this.currentUserId = null;
      this.currentRoleId = null;
    }
  }

  closeDeleteAssigneePopup(): void {
    this.showDeleteAssigneePopup = false;
    this.currentUserId = null;
    this.currentRoleId = null;
  }

  openRolePopup() {
    this.showRolePopup = true;
    this.isManageMode = false;

  }

  closeRolePopup() {
    this.showRolePopup = false;
  }

  openAssignPopup() {
    this.showAssignPopup = true;
    this.isManageMode = false;
  }

  closeAssignPopup() {
    this.showAssignPopup = false;
    this.selectedUserIds.clear();
  }

  confirmRolePopup() {
    if (this.newManageRole.trim()) {
      this.roles.push(this.newManageRole.trim());
    }
    this.newManageRole = '';
    this.showRolePopup = false;
  }

  cancelRolePopup() {
    this.newManageRole = '';
    this.showRolePopup = false;
  }

  selectRoleForEditing(role: any) {
    this.selectedRole = { ...role };
    this.fetchAccessRights(role.role_id);
  }

  // Delete a role
  async deleteRole(role: any) {
    await this.supabaseService.deleteRole(role.role_name);
    this.roles = this.roles.filter(r => r.role_name !== role.role_name);
  }
  
  filteredRoles: any[] = [];

  searchRoleTable() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredRoles = this.roles.filter(role =>
      role.role_name.toLowerCase().includes(searchTerm)
    );
  }
  
  
  clickedRoleId: number | null = null;

  async onRoleClick(role: { role_id: number, role_name: string }) {
    console.log('Role clicked:', role);
    this.assignedRole = role;
    this.clickedRoleId = this.clickedRoleId === role.role_id ? null : role.role_id; // Toggle clicked state
    if (this.clickedRoleId) {
      const { data, error } = await this.supabaseService.getRoleById(role.role_id);
      if (error) {
        console.error('Error fetching role:', error.message);
      } else if (data) {
        this.usersRights = data.users_rights;
        this.rolesRights = data.roles_rights;
        this.supportRights = data.sup_rights;
        this.parametersRights = data.par_rights;
        this.dailyRights = data.daily_rights;
        this.monthlyRights = data.monthly_rights;
        this.weeklyRights = data.weekly_rights;
        this.entriesRights = data.entries;
      }
    }
    await this.loadAssignedUsers(role);
    console.log('Assigned Role:', this.assignedRole);
  }

  // Mockdata for Tickets
  tickets: Ticket[] = [];

  showPassword: any;

  constructor(private supabaseService: SupabaseService) {}

  toggleModal() {
    this.showModal = !this.showModal;
    if (this.showModal) {
      this.generateRandomPassword();
    } else {
      this.resetForm();
    }
  }

  generateRandomPassword(length: number = 8) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;

    let password = '';
    
    // Ensure at least one character from each type
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    this.employee.password = password;
    
    // Provide visual feedback
    this.showPasswordGeneratedMessage = true;
    setTimeout(() => this.showPasswordGeneratedMessage = false, 3000);
  }

  onPhotoChange(event: any) {
    const file = event.target.files[0];
    const maxSizeInBytes = 50 * 1024 * 1024; // 50MB

    // Reset alerts
    this.showFileTypeAlert = false;
    this.showFileSizeAlert = false;

    if (file) {
      if (file.size > maxSizeInBytes) {
        this.showFileSizeAlert = true;
        event.target.value = '';
        return;
      }

      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        this.showFileTypeAlert = true;
        event.target.value = '';
        return;
      }

      this.photoFile = file;

      // Read and display the selected image file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async onSubmit() {
    console.log('Submitting employee data:', this.employee);
    if (!this.isValidEmail(this.employee.email)) {
      console.error('Invalid email format');
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const photoUrl = await this.uploadPhoto();
  
      const employeeData = {
        first_name: this.employee.firstname,
        mid_name: this.employee.midname,
        surname: this.employee.surname,
        email: this.employee.email,
        password: this.employee.password,
        department: this.employee.department,
        position: this.employee.position,
        types: this.employee.type,
        access: true,
        photo_url: photoUrl || this.photoPreviewUrl
      };
  
      console.log('Employee data on submit:', this.employee);
      console.log('Employee data to be sent:', employeeData);
  
      let response;
  
      if (this.isEditing) {
        console.log('Updating employee:', employeeData);
        response = await this.supabaseService.updateEmployee(employeeData);
  
        if (response.error) {
          console.error('Error updating employee:', response.error);
          alert('Error updating employee. Please try again.');
          return;
        } else {
          console.log('Employee updated successfully:', response.data);
        }
      } else {
        const emailExists = await this.supabaseService.checkEmailExists(this.employee.email);
        if (emailExists) {
          console.error('Email already exists. Please use a different email.');
          alert('Email already exists. Please use a different email.');
          return;
        }
  
        console.log('Creating employee:', employeeData);
        response = await this.supabaseService.createEmployee(employeeData);
  
        if (response.error) {
          console.error('Error creating employee:', response.error);
          alert('Error creating employee. Please try again.');
          return;
        } else {
          console.log('Employee created successfully:', response.data);
        }
      }
  
      alert(`Employee ${this.isEditing ? 'updated' : 'created'} successfully.`);
      this.toggleModal();
      this.resetForm();
      this.loadEmployees();
  
    } catch (error) {
      console.error('Error in onSubmit:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  showRoleSuccessMessage: boolean = false;
  showRoleErrorMessage: boolean = false;
  showEmpSuccessMessage: boolean = false;
  showEmpErrorMessage: boolean = false;


  
  
  
  async uploadPhoto(): Promise<string | null> {
    if (!this.photoFile) {
      console.log('No photo file selected');
      return null;
    }
  
    try {
      console.log('Uploading photo:', this.photoFile.name);
      const fileName = `${Date.now()}_${this.photoFile.name}`;
      const { data, error } = await this.supabaseService.uploadFile('photos', fileName, this.photoFile);
  
      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }
  
      console.log('Upload response:', data);
  
      if (data?.path) {
        const fullUrl = `https://vhmftufkipgbxmcimeuq.supabase.co/storage/v1/object/public/photos/${data.path}`;
        console.log('Full photo URL:', fullUrl);
        return fullUrl;
      } else {
        console.warn('Upload successful, but no path returned');
        return null;
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo. Please try again.');
      return null;
    }
  }
  

  addRole() {
    if (!this.newRole) {
      alert('Please enter a role name');
      return;
    }
    const roleData = {
      role_name: this.newRole,
      users_rights: this.popupUsersRights,
      roles_rights: this.popupRolesRights,
      sup_rights: this.popupSupportRights,
      par_rights: this.popupParametersRights,
      daily_rights: this.popupDailyRights,
      monthly_rights: this.popupMonthlyRights,
      weekly_rights: this.popupWeeklyRights,
      entries: this.popupEntriesRights,
    };
    this.supabaseService.createRole(roleData)
    .then(response => {
      if (response.error) {
        console.error('Error creating role:', response.error.message);
        this.showRoleErrorMessage = true;
        setTimeout(() => {
          this.showRoleErrorMessage = false;
        }, 5000); // Hide the message after 3 seconds
      } else {
        if (response.data) {
          console.log('Role created successfully:', response.data);
          this.showRoleSuccessMessage = true;
          setTimeout(() => {
            this.showRoleSuccessMessage = false;
          }, 5000); // Hide the message after 3 seconds
        } else {
          console.log('Role created successfully, but no data returned.');
          this.showRoleSuccessMessage = true;
          setTimeout(() => {
            this.showRoleSuccessMessage = false;
          }, 5000);
        }
        this.closeAddPopup();
      }
    });
    this.showRolePopup = false;
    this.loadRoles();
  }  
  
    async loadAssignedUsers(role: { role_id: number; role_name: string }): Promise<void> {
      this.assignedRole = role;
      console.log('Loading assigned users for role:', this.assignedRole);
    
      try {
        const users = await this.supabaseService.getUsersAssignedToRole(role.role_id);
        this.assignedUsers = users; // Directly assign the fetched users
        console.log('Assigned users:', this.assignedUsers);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error loading assigned users:', error.message);
        } else {
          console.error('An unknown error occurred');
        }
      }
    }

    //used in the assigning of role in "Roles" tab
    onCheckboxChange(userId: number, event: any): void {
      if (event.target.checked) {
        this.selectedUserIds.add(userId);
      } else {
        this.selectedUserIds.delete(userId);
      }
    }

    //Used to assign checked user names in the second container in "Roles" tab
    async assignRole(): Promise<void> {
      if (!this.assignedRole || !this.selectedUserIds.size) {
        console.error('No role or users selected.');
        return;
      }
  
      try {
        await this.supabaseService.assignRoleToUsers(this.assignedRole.role_id, Array.from(this.selectedUserIds));
        console.log('Role assigned successfully.');
        this.closeAssignPopup();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error assigning role:', error.message);
        } else {
          console.error('An unknown error occurred');
        }
      }
    }

  currentUserId: number | null = null;
  currentRoleId: number | null = null;

  async unassignUser(userId: number, roleId: number): Promise<void> {
    try {
      await this.supabaseService.unassignUserFromRole(userId, roleId);
      console.log('User unassigned successfully.');
      this.loadAssignedUsers(this.assignedRole);
      this.showEmpSuccessMessage = true;
      setTimeout(() => {
        this.showEmpSuccessMessage = false;
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error unassigning user:', error.message);
        this.showEmpErrorMessage = true;
        setTimeout(() => {
          this.showEmpErrorMessage = false;
        }, 5000);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }

    async updateRoleName(role: any) {
      try {
        await this.supabaseService.updateRoleName(role.role_id, role.role_name);
        this.editingRoleId = null; // Exit edit mode
        this.originalRoleName = null; // Clear the original name
        this.loadRoles(); // Refresh the roles list
      } catch (error) {
        console.error('Error saving role:', error);
      }
    }

    //for updating access rights
    async fetchAccessRights(roleId: string) {
      try {
        const accessRights = await this.supabaseService.fetchRoleAccessRights(roleId);
        this.selectedRole = { ...this.selectedRole, ...accessRights };
      } catch (error) {
        console.error('Error fetching access rights:', error);
      }
    }
    
    //for access rights update
    async onAccessRightChange(rightType: string, event: any) {
      this.selectedRole[rightType] = event.target.value;
      await this.saveAccessRights(rightType);
    }

    //for updating access rights
    async saveAccessRights(changedRight: string) {
      if (!this.isManageMode) return;
  
      try {
        await this.supabaseService.updateRoleAccessRight(
          this.selectedRole.role_id,
          changedRight,
          this.selectedRole[changedRight]
        );
        console.log(`${changedRight} updated successfully`);
      } catch (error) {
        console.error(`Error updating ${changedRight}:`, error);
      }
    }
  
  toggleUserSelection(user: User) {
    user.selected = !user.selected;
  }

  getSelectedUsers(): User[] {
    return this.users.filter(user => user.selected);
  }

  async updateEmployee(employee: any) {
    try {
      console.log('Updating employee:', employee);
  
      // Get the original employee data for audit logging
      const originalEmployee = this.users.find(user => user.email === employee.email);
      if (!originalEmployee) {
        throw new Error('Employee not found for update');
      }
  
      // Upload the photo and get the URL
      let photoUrl = null;
      if (this.photoFile) {
        photoUrl = await this.uploadPhoto();
        console.log('New photo uploaded, URL:', photoUrl);
      } else {
        console.log('No new photo to upload');
      }
  
      // Determine the profile picture URL
      const profileUrl = photoUrl || this.photoPreviewUrl || employee.photo_url || 'path/to/default/image.png';
      console.log('Profile URL to be used:', profileUrl);
  
      const updatedUser: Partial<User> = {
        profile: profileUrl,
        name: `${employee.firstname.trim()} ${employee.midname ? employee.midname.trim() + ' ' : ''}${employee.surname.trim()}`,
        email: employee.email.trim(),
        password: employee.password,
        department: employee.department.trim(),
        position: employee.position.trim(),
        type: employee.types.trim(),
        status: 'Active',
        access: true
      };
  
      console.log('Updated user object:', updatedUser);
  
      // Update user in the database
      const { data, error } = await this.supabaseService.updateEmployee({
        ...employee,
        photo_url: profileUrl
      });
  
      if (error) {
        console.error('Error updating employee in Supabase:', error);
        throw new Error(`Failed to update employee: ${error.message}`);
      }
  
      console.log('Employee updated successfully in Supabase:', data);
  
      // Update user locally
      const index = this.users.findIndex(user => user.email === employee.email);
      if (index !== -1) {
        this.users[index] = updatedUser as User;
        console.log('Local user array updated');
      } else {
        console.warn('User not found in local array for update');
      }
      this.filteredUsers = this.users;
      this.updatePagination();
  
      // Log the action
      const auditLogEntry: AuditLogEntry = {
        user_id: 'id', // or the ID of the user performing the action
        action: 'UPDATE_EMPLOYEE',
        affected_page: 'User Management',
        parameter: 'Employee Update',
        old_parameter: JSON.stringify(originalEmployee),
        new_parameter: JSON.stringify(updatedUser),
        ip_address: await this.getClientIpAddress(), // Implement this method to get the client's IP
        date: new Date().toISOString()
      };
  
      await this.supabaseService.logAction(auditLogEntry);
  
      // Close modal and reset form
      this.toggleModal();
      this.resetForm();
  
      // Reload employees to ensure consistency
      await this.loadEmployees();
  
      return updatedUser;
    } catch (error) {
      console.error('Error in updateEmployee:', error);
      // Show an error message to the user
      this.showErrorMessage('Failed to update employee. Please try again.');
      throw error; // Re-throw the error so it can be handled by the caller if needed
    }
  }
  
  // Implement these methods:
  
  private async getClientIpAddress(): Promise<string> {
    // Implement a method to get the client's IP address
    // You might need to use a third-party service or ask your backend to provide this information
    return 'client_ip';
  }
  
  private showErrorMessage(message: string): void {
    // Implement a method to show error messages to the user
    // This could be a modal, toast notification, or alert
    alert(message);
  }
  
  
  resetForm() {
    this.employee = {
      email: '',
      password: '',
      firstname: '',
      midname: '',
      surname: '',
      position: '',
      department: '',
      type: ''
    };
    this.photoPreviewUrl = 'https://via.placeholder.com/200x200';
  }

  isFormValid(): boolean {
    return !!(this.employee.email && this.employee.firstname && this.employee.surname &&
              this.employee.position && this.employee.department && this.employee.type);
  }

  async createEmployee(employee: any) {
    console.log('Received employee data:', employee);
  
    if (!this.isValidEmail(employee.email)) {
      console.error('Invalid email format');
      alert('Please enter a valid email address.');
      return;
    }
  
    // Check for required fields
    const requiredFields = ['firstname', 'surname', 'department', 'position', 'type'];
    for (const field of requiredFields) {
      if (!employee[field]) {
        console.error(`Missing required field: ${field}`);
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }
  
    try {
      const photoUrl = await this.uploadPhoto();
  
      const newEmployee = {
        profile: photoUrl || this.photoPreviewUrl,
        email: employee.email,
        first_name: employee.firstname.trim(),
        mid_name: employee.midname ? employee.midname.trim() : null,
        surname: employee.surname.trim(),
        password: this.generateRandomPassword(12),
        department: employee.department,
        position: employee.position,
        types: employee.type,
        status: 'Active',
        access: true
      };
  
      console.log('Sending employee data to Supabase:', newEmployee);
  
      const { data, error } = await this.supabaseService.createEmployee(newEmployee);
  
      if (error) {
        console.error('Error from Supabase:', error);
        alert(`Error creating employee: ${error.message}`);
        return;
      }
  
      if (!data) {
        console.error('No data returned from Supabase');
        alert('Error creating employee: No data returned');
        return;
      }
  
      console.log('Employee created successfully:', data);
  
      // Create audit log
      try {
        const userId = await this.supabaseService.getCurrentUserId();
        await this.createAuditLogWithRetry(userId, data);
      } catch (auditLogError) {
        console.error('Error creating audit log:', auditLogError);
        // Log the error but continue with the process
      }
  
      const newUser: User = {
        profile: newEmployee.profile,
        name: `${newEmployee.first_name} ${newEmployee.mid_name ? newEmployee.mid_name + ' ' : ''}${newEmployee.surname}`,
        email: newEmployee.email,
        password: '***************',
        department: newEmployee.department,
        position: newEmployee.position,
        type: newEmployee.types,
        status: newEmployee.status,
        access: newEmployee.access
      };
  
      this.users.push(newUser);
      this.filteredUsers = [...this.users];
      this.updatePagination();
      this.toggleModal();
      this.resetForm();
      alert('Employee created successfully.');
  
    } catch (error) {
      console.error('Unexpected error creating employee:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  }
  
  private async createAuditLogWithRetry(userId: string, data: any, retries = 3): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        await this.supabaseService.createAuditLog({
          user_id: userId,
          affected_page: 'User Management',
          action: 'Create Employee',
          old_parameter: null,
          new_parameter: JSON.stringify(data)
        });
        console.log('Audit log created successfully');
        return;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed to create audit log:`, error);
        if (i === retries - 1) {
          throw error; // Throw the error after all retries have failed
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }
    }
  }
  ngOnInit() {
    this.loadEmployees();
    this.filteredTickets = this.tickets;
    this.selectedTickets = new Array(this.tickets.length).fill(false);
    this.updateDateTimeForTickets();
    this.loadTickets();
    this.loadEmployeeNames();
    this.loadRoles();
    this.filteredRoles = this.roles;
    this.filterOption = 'none';
    this.filteredUsers = [...this.users];

  } 

  async loadRoles() {
    try {
      this.roles = await this.supabaseService.getRoles();
      this.filteredRoles = this.roles;

      if (this.roles.length > 0) { /*checks if there is a role and displays the first row when you load the page */ 
        this.clickedRoleId = this.roles[0].role_id;
        this.assignedRole = this.roles[0];
        await this.loadAssignedUsers(this.roles[0]);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }

    // Added method to fetch employee names
    loadEmployeeNames(): void {
      this.supabaseService.getEmployeeNames().then(data => {
        if (data) {
          this.employees = data.map(emp => ({
            user_id: emp.user_id,
            firstname: emp.first_name,
            midname: emp.mid_name,
            surname: emp.surname
          }));
        } else {
          console.error('No employee data found.');
        }
      }).catch(error => {
        console.error('Error fetching employees:', error);
      });
    }

  // Fetch tickets from the database
  async loadTickets() {
    try {
      const { data, error } = await this.supabaseService.getTickets();
      if (error) {
        console.error('Error fetching tickets:', error.message);
      } else if (data) {
        this.tickets = data;
        this.filteredTickets = this.tickets;
        this.selectedTickets = new Array(this.tickets.length).fill(false);
        this.ticketUpdatePagination();
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }

  //edit the photo here
  async loadEmployees() {
    try {
      console.log('Fetching employees...');
      const { data, error } = await this.supabaseService.getEmployees();
  
      if (error) {
        console.error('Error fetching employees:', error.message);
        throw error;
      }
  
      if (!data || data.length === 0) {
        console.warn('No employee data received');
        this.users = [];
        this.filteredUsers = [...this.users];
        this.updatePagination();
        return;
      }
  
      console.log(`Raw employee data (${data.length} employees):`, data);
  
      this.users = await Promise.all(data.map(async (employee: any, index: number): Promise<User> => {
        console.log(`Employee ${index} data:`, employee);
  
        let photoUrl: string | null = null;
        let employeeIdentifier: string | null = null;
  
        if (employee.id) {
          employeeIdentifier = employee.id.toString();
        } else if (employee.email) {
          employeeIdentifier = employee.email;
          console.warn(`Employee at index ${index} has no id, using email as identifier`);
        } else {
          console.warn(`Employee at index ${index} has no id or email`);
        }
  
        if (employeeIdentifier) {
          try {
            photoUrl = await this.supabaseService.getPhotoUrl(employeeIdentifier);
            console.log(`Photo URL for employee ${employeeIdentifier}:`, photoUrl);
          } catch (error) {
            console.error(`Error fetching photo URL for employee ${employeeIdentifier}:`, error);
          }
        }
  
        const user: User = {
          profile: photoUrl || 'photo_url',
          name: `${employee.first_name?.trim() || ''} ${employee.mid_name ? employee.mid_name.trim() + ' ' : ''}${employee.surname?.trim() || ''}`.trim(),
          email: employee.email?.trim() || '',
          password: employee.password || '',
          department: employee.department?.trim() || 'Unassigned',
          position: employee.position?.trim() || 'Unassigned',
          type: employee.type?.trim() || 'Unassigned',
          status: 'Active',
          access: true,
        };
  
        console.log(`Mapped user ${index + 1}:`, user);
  
        return user;
      }));
  
      console.log(`Total users mapped: ${this.users.length}`);
  
      this.filteredUsers = this.users;
      this.updatePagination();
  
      console.log('Employee loading complete');
    } catch (error) {
      console.error('Unexpected error while fetching employees:', error);
      // Here you might want to set some error state or show a user-facing error message
    }
  }  

  searchTable() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updatePagination();
  }

  get searchEmpRole() {
    return this.employees.filter(emp => 
      `${emp.firstname} ${emp.midname} ${emp.surname}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }
  
  get searchroletab() {
    return this.roles.filter(role => 
      role.role_name.toLowerCase().includes(this.searchRoleTerm.toLowerCase())
    );
  }

  getContractType(position: string): string {
    const positionLower = position.toLowerCase();
    switch (positionLower) {
      case 'manager':
      case 'developer':
        return 'Full-time';
      case 'designer':
        return 'Contract';
      case 'analyst':
        return 'Part-time';
      case 'intern':
        return 'Intern';
      default:
        return 'Part-time';
    }
  }


  toggleUserAccess(user: User) {
    user.access = !user.access;
    user.status = user.access ? 'Active' : 'Inactive';
  }

  // ticketStatus(ticket: Ticket){
  //   ticket.status = !ticket;
  //   ticket.status = ticket.status? 'Open' : 'Closed' : 'In-progress';
  // }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  // Delete user
  async deleteUsers() {
    const selectedUsers = this.getSelectedUsers();
    if (selectedUsers.length === 0) {
      console.log("No users selected for deletion");
      return;
    }
  
    // Initialize a counter for successful deletions
    let successfulDeletions = 0;
  
    // Select users to delete
    for (const selectedUser of selectedUsers) {
      try {
        // Delete user profile and associated photo
        const response = await this.supabaseService.deleteUser(selectedUser.email);
        
        if (response.error) {
          console.error('Error deleting user:', response.error.message);
        } else {
          console.log(`User ${selectedUser.email} deleted successfully`);
          successfulDeletions++;
          
          // Remove the user locally
          this.users = this.users.filter(user => user.email !== selectedUser.email);
          this.filteredUsers = this.filteredUsers.filter(user => user.email !== selectedUser.email);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  
    console.log(`Deleted ${successfulDeletions} users`);
  
    // Update pagination
    this.updatePagination();
  
    // Optionally refresh the page
    // window.location.reload();
  }
  
  


clearSelections() {
  // Clear selection for each user in the array
  this.users.forEach(user => user.selected = false);
}

updatePagination() {
  // Update pagination information based on filtered user list
  this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage); // Calculate total pages
  this.currentPage = 1; // Reset current page to 1
  this.paginate(); // Paginate to display users on the first page
}

paginate() {
  // Paginate the filtered user list based on current page and items per page
  const start = (this.currentPage - 1) * this.itemsPerPage; // Calculate start index
  const end = start + this.itemsPerPage; // Calculate end index (exclusive)
  this.paginatedUsers = this.filteredUsers.slice(start, end); // Extract users for the current page
}

prevPage() {
  // Navigate to the previous page if current page is greater than 1
  if (this.currentPage > 1) {
    this.currentPage--; // Decrease current page number
    this.paginate(); // Update paginated users
  }
}

nextPage() {
  // Navigate to the next page if current page is less than total pages
  if (this.currentPage < this.totalPages) {
    this.currentPage++; // Increase current page number
    this.paginate(); // Update paginated users
  }
}

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.searchRoleTerm = '';
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.clearSelections();
    }
  }

  editUser(user: User) {
    this.employee = {
      email: user.email,
      password: user.password, // Change this line to use the user's password
      firstname: user.name.split(' ')[0],
      midname: user.name.split(' ').length > 2 ? user.name.split(' ')[1] : '',
      surname: user.name.split(' ')[user.name.split(' ').length - 1],
      position: user.position,
      department: user.department,
      type: user.type
    };
    this.photoPreviewUrl = user.profile;
    this.showModal = true;
    this.isEditing = true;
  }

  resetAccessForm() {
    this.newRole = '';
  }


  toggleManagePopup() {
    this.showManagePopup = !this.showManagePopup;
  }

  toggleAddPopup() {
    this.showAddPopup = !this.showAddPopup;
    if (this.showAddPopup){
      this.resetAccessForm();
    }
  }


  closeAddPopup() {
    this.showAddPopup = false;
    this.resetAccessForm();
  }

  toggleEditPopup() {
    this.showEditPopup = !this.showEditPopup;
  }

  closeEditPopup() {
    this.showEditPopup = false;
  }

  toggleAccessRightsPopup() {
    this.showAccessRightsPopup = !this.showAccessRightsPopup;
  }

  exitPopup(): void {
    this.showManagePopup = false;
  }

  closePopupOutside(event: MouseEvent): void {
    this.showManagePopup = false;
  }

 //Ticket Management Functions: Method to search tickets
  searchTicketTable() {
    const searchTerm = this.searchTicketTerm.toLowerCase();
    this.filteredTickets = this.tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTerm) ||
      ticket.description.toLowerCase().includes(searchTerm) ||
      ticket.status.toLowerCase().includes(searchTerm) ||
      ticket.email.toLowerCase().includes(searchTerm)
    );
    this.ticketUpdatePagination();
  }

  refreshTable() {
    // Fetch the latest tickets
    this.loadTickets();
  }

// Method to toggle selection of all tickets
toggleAllTickets() {
  const selectAll = this.selectedTickets.every(selected => selected); // Check if all tickets are selected
  this.selectedTickets.fill(!selectAll); // Toggle selection status for all tickets
}

// Method to get selected tickets
getSelectedTickets(): Ticket[] {
  return this.tickets.filter((ticket, index) => this.selectedTickets[index]); // Return selected tickets
}

// Method to update a ticket
updateTicket(updatedTicket: Ticket) {
  const index = this.tickets.findIndex(ticket => ticket.id === updatedTicket.id); // Find index of ticket to update
  if (index !== -1) {
    this.tickets[index] = updatedTicket; // Update ticket in main list
    this.filteredTickets = [...this.tickets]; // Update filtered list
    this.ticketUpdatePagination(); // Update pagination
  }
}

// Method to delete a ticket
deleteTicket(ticketId: number) {
  const index = this.tickets.findIndex(ticket => ticket.id === ticketId); // Find index of ticket to delete
  if (index !== -1) {
    this.tickets.splice(index, 1); // Remove ticket from main list
    this.filteredTickets = [...this.tickets]; // Update filtered list
    this.selectedTickets.splice(index, 1); // Remove selection status
    this.ticketUpdatePagination(); // Update pagination
  }
}

// Method to delete selected tickets
async deleteSelectedTickets() {
  const selectedTickets = this.getSelectedTickets();
  if (selectedTickets.length === 0) {
    console.log("No tickets selected for deletion");
    return;
  }

  try {
    for (const ticket of selectedTickets) {
      const { error } = await this.supabaseService.deleteTicket(ticket.id);
      if (error) {
        console.error(`Error deleting ticket ${ticket.id}:`, error.message);
      } else {
        console.log(`Ticket ${ticket.id} deleted successfully`);
      }
  }

// Remove deleted tickets from local arrays
this.tickets = this.tickets.filter(ticket => !selectedTickets.includes(ticket));
this.filteredTickets = this.filteredTickets.filter(ticket => !selectedTickets.includes(ticket));
this.selectedTickets = this.selectedTickets.filter((_, index) => !this.selectedTickets[index]);
  console.log(`Deleted ${selectedTickets.length} tickets`);
    // Update pagination
      this.ticketUpdatePagination();
     // Refresh the ticket list
      await this.loadTickets();
    } catch (error) {
      console.error('Error deleting tickets:', error);
    }
}

// Method to filter tickets based on selected option
filterTickets() {
  switch (this.filterOption.toLowerCase()) {
    case 'low':
      this.filteredTickets = this.tickets.filter(ticket => ticket.priority.toLowerCase() === 'low');
      break;
    case 'medium':
      this.filteredTickets = this.tickets.filter(ticket => ticket.priority.toLowerCase() === 'medium');
      break;
    case 'high':
      this.filteredTickets = this.tickets.filter(ticket => ticket.priority.toLowerCase() === 'high');
      break;
    case 'urgent':
      this.filteredTickets = this.tickets.filter(ticket => ticket.priority.toLowerCase() === 'urgent');
      break;
    default:
      this.filteredTickets = [...this.tickets];
      break;
  }
  this.ticketUpdatePagination();
}

// Method to calculate the total number of pages
ticketTotalPages(): number {
  if (!this.ticket_itemsPerPage || this.ticket_itemsPerPage <= 0) {
    console.error('Invalid ticket_itemsPerPage value:', this.ticket_itemsPerPage);
    return 0;
  }

  const totalFilteredTickets = this.filteredTickets.length;
  return Math.ceil(totalFilteredTickets / this.ticket_itemsPerPage);
}


// Method to update pagination and calculate the total number of pages
ticketUpdatePagination() {
  this.ticket_totalPages = this.ticketTotalPages(); // Update total pages
  this.ticket_currentPage = 1; // Reset current page to 1
  this.ticketPaginate(); // Paginate to display tickets on the first page
}

// Method to paginate tickets based on current page
ticketPaginate(): Ticket[] {
  const start = (this.ticket_currentPage - 1) * this.ticket_itemsPerPage; // Calculate start index
  const end = start + this.ticket_itemsPerPage; // Calculate end index (exclusive)
  return this.filteredTickets.slice(start, end); // Extract tickets for the current page
}

// Method to navigate to the previous page
ticketPrevPage() {
  if (this.ticket_currentPage > 1) {
    this.ticket_currentPage--; // Decrease current page number
    this.ticketPaginate(); // Update displayed tickets
  }
}

// Method to navigate to the next page
ticketNextPage() {
  if (this.ticket_currentPage < this.ticketTotalPages()) {
    this.ticket_currentPage++; // Increase current page number
    this.ticketPaginate(); // Update displayed tickets
  }
}


// Method to update datetime for tickets
updateDateTimeForTickets() {
  this.tickets.forEach(ticket => {
    ticket.dateTime = new Date(); // Update datetime for each ticket
  });
}

// Method to open ticket details in modal
openTicketDetails(ticket: any) {
  this.selectedTicket = ticket; // Set selected ticket
  this.isModalVisible = true; // Show modal
}

 // Method to update ticket priority
// In your component file

async updateTicketPriority(ticket: Ticket, event: Event): Promise<void> {
  const selectElement = event.target as HTMLSelectElement;
  const newPriority = selectElement.value as 'Low' | 'Medium' | 'High' | 'Urgent';
  
  try {
    // Update in Supabase
    await this.supabaseService.updateTicketPriority(ticket.id, newPriority);
    
    // If successful, update local state
    ticket.priority = newPriority;
    
    console.log(`Ticket ${ticket.id} priority updated to ${newPriority}`);
  } catch (error) {
    console.error('Failed to update ticket priority:', error);
    // Revert the select element to the previous value
    selectElement.value = ticket.priority;
    // Optionally, show an error message to the user
  }
}

closeModal() {
  this.isModalVisible = false;
}

async replyTicket(): Promise<void> {
  if (this.selectedTicket) {
    try {
      // Update the ticket with the new reply
      this.selectedTicket.reply = this.replyText;
      this.selectedTicket.status = 'Replied'; // Or any other appropriate status
      this.selectedTicket.logres = new Date().toISOString(); // Update last response time

      // Update the ticket in the database
      const { data, error } = await this.supabaseService.updateTicket(this.selectedTicket);

      if (error) throw error;

      this.closeModal();
      this.replyText = ''; // Reset reply text after sending
    } catch (error) {
      console.error('Error replying to ticket:', error);
      // Handle error (e.g., show an error message to the user)
    }
  } else {
    console.log('No ticket selected to reply.');
  }
}

// Functions for Sorting alphabetically, ascending and descending order

sortUsers(sortOption: string): void {
  if (sortOption === 'none') {
    // Default sort: most recently added users
    this.filteredUsers = [...this.users].sort((a, b) => (b.dateAdded || new Date()).getTime() - (a.dateAdded || new Date()).getTime());
  } else if (sortOption === 'asc') {
    // Sort alphabetically ascending
    this.filteredUsers = [...this.users].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'desc') {
    // Sort alphabetically descending
    this.filteredUsers = [...this.users].sort((a, b) => b.name.localeCompare(a.name));
  }
  this.updatePagination();
}

onSortOptionChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedOption = target.value as 'asc' | 'desc';
  this.sortUsers(selectedOption);
}


//DO NOT DELETE: These codes below might be useful in the future

  // doneTicket(){
  //   // Mark selectedTicket as done
  //   this.selectedTicket.status = 'Done';
  //   this.updateTicket(this.selectedTicket);
  //   this.closeModal();
  // }

  // Method to prompt user for filter options
//   promptFilterOptions() {
//   const markAsRead = confirm("Mark all tickets as read? Click 'Cancel' to mark all as unread.");
//   if (markAsRead) {
//     this.markAllAsRead();
//     } else {
//     this.markAllAsUnread();
//     }
//   }

//   // Method to mark all tickets as read
//   markAllAsRead() {
//     this.tickets.forEach(ticket => ticket.status = 'Read');
//     this.filteredTickets = [...this.tickets];
//     this.ticketUpdatePagination();
//   }

//   // Method to mark all tickets as unread
//   markAllAsUnread() {
//     this.tickets.forEach(ticket => ticket.status = 'Unread');
//     this.filteredTickets = [...this.tickets];
//     this.ticketUpdatePagination();
//   }
}