package com.ppm_tool.ppm.web;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ppm_tool.ppm.project.Project;
import com.ppm_tool.ppm.services.MappingValidationErrors;
import com.ppm_tool.ppm.services.ProjectService;

@RestController
@RequestMapping("/api/v1/project")
@CrossOrigin //(origins = "http://localhost:3000")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MappingValidationErrors mappingValidationService;
	
	@GetMapping("/all")
	public Iterable<Project> getAllProjects(Principal principal){
		return projectService.findProjectsByProjectLeader(principal.getName());
				
	}

	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){
		
		ResponseEntity<?> errorMap = mappingValidationService.MappingValidationService(result);
		if(errorMap != null) return errorMap;
		
		projectService.saveOrUpdate(project, principal.getName());
		return new ResponseEntity<Project>(project, HttpStatus.CREATED);
	}
	
	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProject(@PathVariable String projectId, Principal principal){
		Project fetchedProject = projectService.findProjectByIdentifier(projectId, principal.getName());

		return new ResponseEntity<Project>(fetchedProject, HttpStatus.OK);
	}
	

	
	@DeleteMapping("/{projectId}")
	public ResponseEntity<String> deleteProject(@PathVariable String projectId, Principal principal){
		projectService.deleteProjectById(projectId, principal.getName());
		
		return new ResponseEntity<String>("Project " + projectId + " was deleted", HttpStatus.OK);
	}
	
}
