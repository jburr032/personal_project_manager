package com.ppm_tool.ppm.services;

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
	
	private String projectNotExist = "Project with ID ";
	
	public Project saveOrUpdate(Project project, String username) {
		
		if(project.getId() != null) {
			Project existingProject = projectRepo.findByProjectIdentified(project.getProjectIdentified());
			
			if(existingProject != null && !existingProject.getProjectLeader().equals(username)) {
				throw new ProjectIdException("Project is not associated with your account");
				
			}else if(existingProject == null){
				throw new ProjectIdException(projectNotExist + project.getProjectIdentified().toUpperCase() + " does not exist");

			}
		}
		
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
			throw new ProjectIdException(projectNotExist + project.getProjectIdentified().toUpperCase() + " already exists");
		}
		
	}
	
	public Project findProjectByIdentifier(String projectId, String username) {
		
		Project project =  projectRepo.findByProjectIdentified(projectId.toUpperCase());
		
		if(project == null) {
			throw new ProjectIdException(projectNotExist + projectId + " does not exist");

		}
		
		if(!project.getProjectLeader().equals(username)) {
			throw new ProjectIdException("Project is not associated with your account");

		}
		
		return project;
	}
	
	public Iterable<Project> findProjectsByProjectLeader(String username){
		return projectRepo.findAllByProjectLeader(username);	
	}
	
	public void deleteProjectById(String projectId, String username) {
		
		projectRepo.delete(findProjectByIdentifier(projectId, username));
	}
	
}
