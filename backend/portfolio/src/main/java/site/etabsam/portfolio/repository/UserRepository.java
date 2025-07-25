package site.etabsam.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import site.etabsam.portfolio.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);
}
