package com.ppm_tool.ppm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ppm_tool.ppm.domain.Backlog;
import com.ppm_tool.ppm.domain.User;
import com.ppm_tool.ppm.exceptions.ProjectIdException;
import com.ppm_tool.ppm.project.Project;
import com.ppm_tool.ppm.repository.BacklogRepository;
import com.ppm_tool.ppm.repository.ProjectRepository;
import com.ppm_tool.ppm.repository.UserRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepo;
	
	@Autowired
	private BacklogRepository backlogRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public Project saveOrUpdate(Project project, String username) {
		try {
			String projectIdentified = project.getProjectIdentified().toUpperCase();
			project.setProjectIdentified(projectIdentified);
			
			User user = userRepo.findByUsername(username);
			
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
			
			if(project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(projectIdentified);
				
			}
			
			if(project.getId() != null) {
				Backlog backlog = backlogRepo.findByProjectIdentifier(projectIdentified);
				
				project.setBacklog(backlog);
			}
			
			return projectRepo.save(project);
			
		}catch(Exception e) {
			throw new ProjectIdException("Project ID " + project.getProjectIdentified().toUpperCase() + " already exists");
		}
		
	}
	
	public Project findProjectByIdentifier(String projectId) {
		
		Project project =  projectRepo.findByProjectIdentified(projectId.toUpperCase());
		
		if(project == null) {
			throw new ProjectIdException("Project ID " + projectId + " does not exist");

		}
		
		return project;
	}
	
	public Iterable<Project> findAllProjects(){
		return projectRepo.findAll();	
	}
	
	public void deleteProjectById(String projectId) {
		Project project = projectRepo.findByProjectIdentified(projectId.toUpperCase());
		
		if(project == null) throw new ProjectIdException("Project ID " + projectId + " does not exist");
		
		projectRepo.delete(project);
	}
	
}
