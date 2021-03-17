package com.ppm_tool.ppm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ppm_tool.ppm.exceptions.ProjectIdException;
import com.ppm_tool.ppm.project.Project;
import com.ppm_tool.ppm.repository.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepo;
	
	public Project saveOrUpdate(Project project) {
		try {
			project.setProjectIdentified(project.getProjectIdentified().toUpperCase());
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
}
