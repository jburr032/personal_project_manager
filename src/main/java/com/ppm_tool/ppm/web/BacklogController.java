package com.ppm_tool.ppm.web;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ppm_tool.ppm.domain.Backlog;
import com.ppm_tool.ppm.domain.ProjectTask;
import com.ppm_tool.ppm.repository.BacklogRepository;
import com.ppm_tool.ppm.services.MappingValidationErrors;
import com.ppm_tool.ppm.services.ProjectTaskService;

@RestController
@RequestMapping("/api/v1/backlog")
@CrossOrigin //(origins = "http://localhost:3000")
public class BacklogController {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	
	@Autowired
	private MappingValidationErrors mapValidationErrorService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addPtToBacklog(
			@Valid @RequestBody ProjectTask projectTask, 
			BindingResult result,
			@PathVariable String backlog_id,
			Principal principal
		){
		ResponseEntity<?> errorMap = mapValidationErrorService.MappingValidationService(result);
		
		if(errorMap != null) return errorMap;
		
		ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());
		
		return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
		
	}
	
	@GetMapping("/{backlog_id}")
	public ResponseEntity<?> getNextProjectSequence(@PathVariable String backlog_id, Principal principal){
		HashMap<String, Object> getResponse = new HashMap<String,Object>();
		
		Integer nextSequence = projectTaskService.getNextProjectSequence(backlog_id);
		Iterable<ProjectTask> projectTasks = projectTaskService.findBacklogById(backlog_id, principal.getName());
		
		getResponse.put("next_sequence", nextSequence);
		getResponse.put("project_tasks", projectTasks);
		
		return new ResponseEntity<Map<String, Object>>(getResponse, HttpStatus.OK);
		
	}
	
	
	@GetMapping("/{backlog_id}/{project_task_sequence}")
	public ResponseEntity<?> getProjectTaskBySequence(@PathVariable String backlog_id, @PathVariable String project_task_sequence, Principal principal) {
		
		ProjectTask projectTask = projectTaskService.findProjectTaskBySequence(backlog_id, project_task_sequence, principal.getName());
		
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
		
	}
	
	@PatchMapping("/{backlog_id}/{project_task_sequence}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, 
			BindingResult result, 
			@PathVariable String backlog_id, 
			@PathVariable String project_task_sequence,
			Principal principal){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MappingValidationService(result);
		
		if(errorMap != null) return errorMap;
		
		ProjectTask updatedProjectTask = projectTaskService.updateProjectTask(projectTask, backlog_id, project_task_sequence, principal.getName());
		
		return new ResponseEntity<ProjectTask>(updatedProjectTask, HttpStatus.OK);
		
	}
	
	@DeleteMapping("/{backlog_id}/{project_task_sequence}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String project_task_sequence, Principal principal){
		
		projectTaskService.deletePtByProjectSequence(backlog_id, project_task_sequence, principal.getName());
		
		return new ResponseEntity<String>("Project task " + project_task_sequence + " deleted successfully", HttpStatus.OK);
	}

}
