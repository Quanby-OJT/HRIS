import { booleanAttribute, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../Supabase/supabase.service';

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
  term: string;
  type: string;
  status: string;
  access: boolean;
  selected?: boolean;
}

interface Employee {
  email: string;
  firstName: string;
  middleName: string;
  surname: string;
  position: string;
  department: string;
  type: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
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
  showAccessRightsPopup = false;
  showAddDepartmentPopup = false;
  isEditing: boolean = false;
  showModal = false;
  photoPreviewUrl = 'https://via.placeholder.com/200x200';
  showPasswordGeneratedMessage: boolean = false;
  newRole = '';
  newDepartment = '';
  departmentType = 'all';
  selectedDepartment = '';
  selectedDepartments: string[] = [];
  departments = ['HR', 'IT', 'Finance', 'Marketing'];

  modules = [
    'Personnel Information Management',
    'Payroll Management',
    'Employee Information Management',
    'Time & Attendance Management',
    'Online Job Application Portal',
    'Recruitment, Selection and Placement',
    'Learning and Development (L&D)',
    'Rewards and Recognition',
    'Performance Management',
    'Health and Wellness',
    'Forms and Workflow',
    'Reports',
    'Data Exchange (Export and Import)',
    'Data Visualization'
  ];
  
  reports = [
    'Employee Performance Reports',
    'Payroll Summaries',
    'Recruitment Reports',
    'Training Reports',
    'No Access'
  ];

  dataAccess = [
    'Employee Records',
    'Financial Data',
    'Attendance Records',
    'Job Applications',
    'Training Data',
    'No Access'
  ];

  privileges = ['View', 'Edit', 'Delete', 'Approve'];

  moduleAccess: AccessRights = {};
  reportAccess: AccessRights = {};
  dataAccessRights: AccessRights = {};
  privilegeRights: AccessRights = {};

  departmentAccessRights = [
    'View Department Data',
    'Edit Department Data',
    'Manage Department Members',
    'Approve Department Requests'
  ];

  departmentAccess: AccessRights = {};

  showPhotoMessage = true; // Property to control the visibility of the message
  showFileTypeAlert = false;
  showFileSizeAlert = false;

  employee = {
    email: '',
    password: '',
    firstname: '',
    midname: '',
    surname: '',
    position: '',
    department: '',
    type: '',
    status: 'Pending',
    access: true
  };

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
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

    // Reset alerts
    this.showFileTypeAlert = false;
    this.showFileSizeAlert = false;

    if (file) {
      if (file.size > maxSizeInBytes) {
        this.showFileSizeAlert = true;
        event.target.value = ''; // Clear the file input
        return;
      }

      if (file.type !== 'image/png') {
        this.showFileTypeAlert = true;
        event.target.value = ''; // Clear the file input
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Submitting form with employee data:', this.employee);
    this.supabaseService.createEmployee(this.employee)
      .then(response => {
        if (response.error) {
          console.error('Error creating employee:', response.error.message);
        } else {
          console.log('Employee created successfully:', response.data);
          this.toggleModal();
          this.resetForm();
          this.loadEmployees();
        }
      });
  }

  toggleUserSelection(user: User) {
    user.selected = !user.selected;
  }

  getSelectedUsers(): User[] {
    return this.users.filter(user => user.selected);
  }

  updateEmployee(employee: any, index: number) {
    const updatedUser: Partial<User> = {
      profile: this.photoPreviewUrl,
      name: `${employee.firstname} ${employee.midname ? employee.midname + ' ' : ''}${employee.surname}`,
      email: employee.email,
      password: '***************',
      department: employee.department,
      position: employee.position,
      type: employee.type,
      status: 'Pending',
      access: true
    };
  
    this.users[index] = updatedUser as User;
    this.filteredUsers = this.users;
    this.updatePagination();
  
    this.supabaseService.updateEmployee(employee).then(response => {
      if (response.error) {
        console.error('Error updating employee:', response.error.message);
      } else {
        console.log('Employee updated successfully:', response.data);
      }
    });
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
      type: '',
      status: 'Pending',
      access: true
    };
    this.photoPreviewUrl = 'https://via.placeholder.com/200x200';
  }

  isFormValid(): boolean {
    return !!(this.employee.email && this.employee.firstname && this.employee.surname &&
              this.employee.position && this.employee.department && this.employee.type);
  }

  async createEmployee(employee: any) {
    const newUser = {
      email: employee.email,
      first_name: employee.firstname,
      mid_name: employee.midname,
      surname: employee.surname,
      password: employee.password,
      department: employee.department,
      position: employee.position,
      types: employee.type,
      status: 'Pending',
      access: 'True'
    };

    const { data, error } = await this.supabaseService.createEmployee(newUser);
    if (error) {
      console.error('Error creating profile:', error);
    } else if (data) {
      const newUser: User = {
        profile: this.photoPreviewUrl,
        name: `${employee.firstname} ${employee.midname ? employee.midname + ' ' : ''}${employee.surname}`,
        email: employee.email,
        password: '***************',
        department: employee.department,
        position: employee.position,
        type: employee.type,
        status: 'Active',
        access: true,
        term: '' // Add this property to match the User interface
      };
      this.users.push(newUser);
      this.filteredUsers = this.users;
      this.updatePagination();
    }
  }

  ngOnInit() {
    this.loadEmployees();
  }

  async loadEmployees() {
    try {
      const { data, error } = await this.supabaseService.getEmployees();
      if (error) {
        console.error('Error fetching employees:', error.message);
      } else if (data) {
        this.users = data.map((employee: any): User => ({
          profile: 'https://via.placeholder.com/200x200',
          name: `${employee.first_name} ${employee.mid_name ? employee.mid_name + ' ' : ''}${employee.surname}`,
          email: employee.email,
          password: '***************',
          department: employee.department,
          position: employee.position,
          type: employee.types,
          status: 'Active',
          access: true,
          term: '' // Add this property to match the User interface
        }));
        this.filteredUsers = this.users;
        this.updatePagination();
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
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

  addRole() {
    console.log("Adding Role");
  }

  toggleUserAccess(user: User) {
    user.access = !user.access;
  }

  deleteUsers() {
    const selectedUsers = this.getSelectedUsers();
    if (selectedUsers.length === 0) {
      console.log("No users selected for deletion");
      return;
    }
    
    selectedUsers.forEach(selectedUser => {
      this.users = this.users.filter(user => user !== selectedUser);
      this.filteredUsers = this.filteredUsers.filter(user => user !== selectedUser);
    });
    
    console.log(`Deleted ${selectedUsers.length} users`);
    this.updatePagination();
  }

  clearSelections() {
    this.users.forEach(user => user.selected = false);
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
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
      password: '',
      firstname: user.name.split(' ')[0],
      midname: user.name.split(' ').length > 2 ? user.name.split(' ')[1] : '',
      surname: user.name.split(' ')[user.name.split(' ').length - 1],
      position: user.position,
      department: user.department,
      type: user.type,
      status: user.status,
      access: true
    };
    this.photoPreviewUrl = user.profile;
    this.showModal = true;
  }

  saveRole() {
    if (!this.newRole) {
      alert('Please enter a role name');
      return;
    }

    if (this.departmentType === 'specific' && !this.selectedDepartment) {
      alert('Please select a department');
      return;
    }

    const roleData = {
      role: this.newRole,
      department: this.departmentType === 'all' ? 'All Departments' : this.selectedDepartment === 'specific' ? this.selectedDepartment : this.selectedDepartments,
      moduleAccess: this.moduleAccess,
      reportAccess: this.reportAccess,
      dataAccess: this.dataAccessRights,
      privileges: this.privilegeRights
    };

    console.log('Saving Role: ', roleData);

    this.closeAddPopup();
  }

  resetAccessForm() {
    this.newRole = '';
    this.departmentType = 'all';
    this.selectedDepartment = '';
    this.moduleAccess = {};
    this.reportAccess = {};
    this.dataAccessRights = {};
    this.privilegeRights = {};
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
  toggleAddDepartmentPopup() {
    this.showAddDepartmentPopup = !this.showAddDepartmentPopup;
    if (this.showAddDepartmentPopup) {
      this.resetDepartmentForm();
    }
  }

  closeAddDepartmentPopup() {
    this.showAddDepartmentPopup = false;
    this.resetDepartmentForm();
  }

  resetDepartmentForm() {
    this.newDepartment = '';
    this.departmentAccessRights.forEach(access => this.departmentAccess[access] = false);
  }

  saveDepartment() {
    if (!this.newDepartment) {
      alert('Please enter a department name');
      return;
    }

    const departmentData = {
      department: this.newDepartment,
      accessRights: this.departmentAccess
    };

    console.log('Saving department:', departmentData);
    // Implement your logic to save the department data

    this.closeAddDepartmentPopup();
  }
  
}