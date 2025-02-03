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
  selectedProject: Project | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  selectProject(project: Project): void {
    this.selectedProject = { ...project }; // Create a copy of the project
  }

  updateProject(project: Project): void {
    if (project.id) {
      this.apiService.updateProject(project.id, project).subscribe(() => {
        this.loadProjects(); // Refresh the list after updating
        this.selectedProject = null; // Clear the selected project
      });
    }
  }

  deleteProject(id: string): void {
    this.apiService.deleteProject(id).subscribe(() => {
      this.loadProjects(); // Refresh the list after deleting
    });
  }
}