package main.java.Game;

import main.java.Common.GameRepository;
import main.java.Data.Model.GameModel;
import main.java.Exception.ExceptionNotPlayerTurn;
import main.java.Exception.ExceptionUserAlreadyPlayed;
import main.java.Synchronization.Monitor;
import main.java.Data.Entity.GameEntity;
import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionGameAlreadyExist;
import main.java.Exception.ExceptionGameDoesNotExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private Monitor monitor;


    public void vote(MoveModel moveModel) throws InterruptedException, ExceptionUserAlreadyPlayed, ExceptionNotPlayerTurn {
        monitor.getMoveLock(moveModel);
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

    public MoveModel getChosenMove(String id) throws ExceptionGameDoesNotExist {
        if(!gameRepository.existsById(id))
            throw new ExceptionGameDoesNotExist("This game does not exist");

        return monitor.getChosenMove(id);
    }
}

