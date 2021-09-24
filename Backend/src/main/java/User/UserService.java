package main.java.User;

import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Model.PlayerModel;
import main.java.Data.Translator.PlayerTranslater;
import main.java.Exception.ExceptionUserAlreadyConnected;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void addPlayer(PlayerModel playerModel) throws ExceptionUserAlreadyConnected {
        PlayerEntity playerEntity = PlayerTranslater.toEntity(playerModel);

        if(userRepository.existsById(playerEntity.name)) {
            throw new ExceptionUserAlreadyConnected("A user is already connected with this username");
        }

        userRepository.save(playerEntity);
        System.out.println("Connected as " + playerModel.name + " with team n°" + playerModel.team);
    }

    public List<PlayerModel> getAllPlayer() {
        Iterable<PlayerEntity> iterable = userRepository.findAll();
        List<PlayerModel> list = new ArrayList<PlayerModel>();
        for(PlayerEntity playerEntity : iterable) {
            list.add(PlayerTranslater.toModel(playerEntity));
        }
        return list;
    }
}

interface UserRepository extends CrudRepository<PlayerEntity, String> {}
