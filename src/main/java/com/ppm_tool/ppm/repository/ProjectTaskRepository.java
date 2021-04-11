package com.ppm_tool.ppm.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ppm_tool.ppm.domain.ProjectTask;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

	List<ProjectTask> findByProjectIdentifierOrderByPriority(String id);
}
