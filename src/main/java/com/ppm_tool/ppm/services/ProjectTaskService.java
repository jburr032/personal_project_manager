package com.ppm_tool.ppm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ppm_tool.ppm.domain.Backlog;
import com.ppm_tool.ppm.domain.ProjectTask;
import com.ppm_tool.ppm.exceptions.ProjectNotFoundException;
import com.ppm_tool.ppm.project.Project;
import com.ppm_tool.ppm.repository.BacklogRepository;
import com.ppm_tool.ppm.repository.ProjectRepository;
import com.ppm_tool.ppm.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	@Autowired
	private ProjectTaskRepository projectTaskRepo;
	
	@Autowired
	private BacklogRepository backlogRepo;
	
	@Autowired
	private ProjectRepository projectRepo;
	
	@Autowired
	private ProjectService projectService;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        
            //PTs to be added to a specific project, project != null, BL exists
            Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
            //set the bl to pt
            projectTask.setBacklog(backlog);
            //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
            Integer BacklogSequence = backlog.getPTSequence();
            // Update the BL SEQUENCE
            BacklogSequence++;

            backlog.setPTSequence(BacklogSequence);

            //Add Sequence to Project Task
            projectTask.setProjectSequence(backlog.getProjectIdentifier()+"-"+BacklogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            //INITIAL priority when priority null

            //INITIAL status when status is null
            if(projectTask.getStatus()==""|| projectTask.getStatus()==null){
                projectTask.setStatus("TO_DO");
            }

            if(projectTask.getPriority()==null ||  projectTask.getPriority()== 0){ //In the future we need projectTask.getPriority()== 0 to handle the form
                projectTask.setPriority(3);
            }

            return projectTaskRepo.save(projectTask);

	}

	public Iterable<ProjectTask> findBacklogById(String backlog_id, String username) {
		Project project = projectService.findProjectByIdentifier(backlog_id, username);
		
		if(project == null) {
			throw new ProjectNotFoundException("Project with " + backlog_id + " not found");
		}
		
		return projectTaskRepo.findByProjectIdentifierOrderByPriority(backlog_id);
	}
	
	public Integer getNextProjectSequence(String backlog_id) {
		Backlog backlog = backlogRepo.findByProjectIdentifier(backlog_id);
		
		if(backlog != null) {
			return backlog.getPTSequence() + 1;
		}
		
		return null;
				
	}
	
	public ProjectTask findProjectTaskBySequence(String backlog_id, String pptSequence, String username) {
		projectService.findProjectByIdentifier(backlog_id, username);
		
		ProjectTask projectTask = projectTaskRepo.findByProjectSequence(pptSequence);
		
		if(projectTask == null) {
			throw new ProjectNotFoundException("Project task " + pptSequence + " not found");
		}
		
		if(!projectTask.getProjectIdentifier().equals(backlog_id)){
			throw new ProjectNotFoundException("Project task " + pptSequence + " not found in project " + backlog_id);

		}
		
		return projectTask;
	}
	
	public ProjectTask updateProjectTask(ProjectTask updatedTask, String backlog_id, String project_task_sequence, String username) {
		ProjectTask projectTask = findProjectTaskBySequence(backlog_id, project_task_sequence, username);
		
		projectTask = updatedTask;
		
		return projectTaskRepo.save(projectTask);
	}
	
	public void deletePtByProjectSequence(String backlog_id, String project_task_sequence, String username) {
		ProjectTask projectTask = findProjectTaskBySequence(backlog_id, project_task_sequence, username);
		
		projectTaskRepo.delete(projectTask);
				

	}
}
