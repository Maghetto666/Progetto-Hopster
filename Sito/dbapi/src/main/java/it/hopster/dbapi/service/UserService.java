package it.hopster.dbapi.service;

import it.hopster.dbapi.model.User;
import it.hopster.dbapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(String username, String password, boolean isAdmin) {
        User newUser = new User(null,username, password);
        return userRepository.save(newUser);
    }

    public User updateUser(Long id, String username, String password, boolean isAdmin) {
        User user = new User(id, username, password);
        return userRepository.save(user);
    }

    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
