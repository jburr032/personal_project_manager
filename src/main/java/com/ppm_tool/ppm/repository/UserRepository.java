package com.ppm_tool.ppm.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.ppm_tool.ppm.domain.User;


@Repository
public interface UserRepository extends CrudRepository<User, Long>{

	User findByUsername(String username);
}
