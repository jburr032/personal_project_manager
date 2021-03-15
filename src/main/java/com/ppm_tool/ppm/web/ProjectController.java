package com.ppm_tool.ppm.web;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ppm_tool.ppm.project.Project;
import com.ppm_tool.ppm.services.ProjectService;

@Controller
@RequestMapping("/api/v1/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;

	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){
		if(result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<>();
			
			for(FieldError error: result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		projectService.saveOrUpdate(project);
		return new ResponseEntity<Project>(project, HttpStatus.CREATED);
	}
}
