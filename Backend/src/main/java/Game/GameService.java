package main.java.Game;

import main.java.Common.GameRepository;
import main.java.Common.Synchronization.Monitor;
import main.java.Data.Entity.GameEntity;
import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionGameAlreadyExist;
import main.java.Exception.ExceptionGameDoesNotExist;
import main.java.Exception.ExceptionPlayerAlreadyVoted;
import main.java.Exception.ExceptionUserDoesNotExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private Monitor monitor;


    public void vote(MoveModel moveModel) throws InterruptedException, ExceptionPlayerAlreadyVoted, ExceptionUserDoesNotExist {
        monitor.postMove(moveModel);
    }

    public String create() throws ExceptionGameAlreadyExist {

        int n = 15;

        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        String id = sb.toString();

        if(gameRepository.existsById(id))
            throw new ExceptionGameAlreadyExist("This game id already exist");

        GameEntity gameEntity = new GameEntity();
        gameEntity.id = id;
        gameEntity.w_players = 0;
        gameEntity.b_players = 0;
        gameRepository.save(gameEntity);

        monitor.create(id);

        return id;
    }

    public void delete(String id) throws ExceptionGameDoesNotExist {
        if(!gameRepository.existsById(id))
            throw new ExceptionGameDoesNotExist("This game does not exist");

        monitor.delete(id);
        gameRepository.deleteById(id);
    }

    public List<MoveModel> getVotes(String id) {
        return monitor.getVotes(id);
    }
}

