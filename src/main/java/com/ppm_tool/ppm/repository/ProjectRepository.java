package com.ppm_tool.ppm.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ppm_tool.ppm.project.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

	Project findByProjectIdentified(String projectId);
	
	@Override
	Iterable<Project> findAll();
}
