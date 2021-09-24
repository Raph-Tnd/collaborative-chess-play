package main.java.User;

import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Model.PlayerModel;
import main.java.Data.Translator.PlayerTranslater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void addPlayer(PlayerModel playerModel) {
        PlayerEntity playerEntity = PlayerTranslater.toEntity(playerModel);
        userRepository.save(playerEntity);
        System.out.println("Connected as " + playerModel.name + " with team n°" + playerModel.team);
    }
}

interface UserRepository extends CrudRepository<PlayerEntity, String> {}
