import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { title: '', description: '', imageUrl: '' };
  selectedProject: Project | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // Load all projects (GET)
  loadProjects(): void {
    this.apiService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  // Create a new project (POST)
  createProject(): void {
    this.apiService.createProject(this.newProject).subscribe((createdProject) => {
      this.projects.push(createdProject);
      this.newProject = { title: '', description: '', imageUrl: '' }; // Reset form
    });
  }

  // Update a project (PUT)
  updateProject(): void {
    if (this.selectedProject && this.selectedProject.id) {
      this.apiService.updateProject(this.selectedProject.id, this.selectedProject).subscribe(() => {
        this.loadProjects(); // Refresh the list
        this.selectedProject = null; // Clear selection
      });
    }
  }

  // Delete a project (DELETE)
  deleteProject(id: number): void {
    this.apiService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter((project) => project.id !== id);
    });
  }

  // Select a project for editing
  selectProject(project: Project): void {
    this.selectedProject = { ...project }; // Clone the project to avoid direct reference
  }
}