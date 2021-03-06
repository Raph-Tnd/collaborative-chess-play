package main.java.User;

import main.java.Common.GameRepository;
import main.java.Common.UserRepository;
import main.java.Data.Entity.GameEntity;
import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Model.PlayerModel;
import main.java.Data.Translator.PlayerTranslater;
import main.java.Exception.ExceptionGameDoesNotExist;
import main.java.Exception.ExceptionUserAlreadyConnected;
import main.java.Exception.ExceptionUserDoesNotExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GameRepository gameRepository;

    public void addPlayer(PlayerModel playerModel) throws ExceptionUserAlreadyConnected, ExceptionGameDoesNotExist {
        PlayerEntity playerEntity = PlayerTranslater.toEntity(playerModel);

        if(userRepository.userAlreadyConnected(playerEntity.id.getId_game(),playerEntity.id.getName()) == 1)
            throw new ExceptionUserAlreadyConnected("A user is already connected with this username");

        if(!gameRepository.existsById(playerEntity.id.getId_game()))
            throw new ExceptionGameDoesNotExist("This game does not exist");

        userRepository.save(playerEntity);
        GameEntity gameEntity = gameRepository.findById(playerEntity.id.getId_game()).get();
        if(playerModel.team == 0) {
            gameEntity.w_players++;
        } else {
            gameEntity.b_players++;
        }
        gameRepository.save(gameEntity);
    }

    public void deletePlayer(String name, String idGame) throws ExceptionUserDoesNotExist {
        if(userRepository.userAlreadyConnected(idGame, name) == 0)
            throw new ExceptionUserDoesNotExist("Cannot find any player connected on this game");
        userRepository.deleteByPlayerId(idGame, name);
    }

    public List<PlayerModel> getAllPlayer(String id) {
        Iterable<PlayerEntity> iterable = userRepository.findAll();
        List<PlayerModel> list = new ArrayList<PlayerModel>();
        for(PlayerEntity playerEntity : iterable) {
            if(playerEntity.id.getId_game().equals(id))
                list.add(PlayerTranslater.toModel(playerEntity));
        }
        return list;
    }
}

