package com.ppm_tool.ppm.services;

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
}
