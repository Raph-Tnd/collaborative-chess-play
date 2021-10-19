package main.java.Synchronization;

import main.java.Common.GameRepository;
import main.java.Common.UserRepository;
import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Entity.PlayerId;
import main.java.Data.Model.MoveModel;
import main.java.Data.Model.PlayerModel;
import main.java.Exception.ExceptionNotPlayerTurn;
import main.java.Exception.ExceptionUserAlreadyPlayed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class Monitor {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GameRepository gameRepository;

    public Map<String, Lock> locks = new HashMap<>();

    public synchronized void create(String id) {
        System.out.println("Created lock for game " + id);
        this.locks.put(id, new Lock());
    }

    public synchronized void delete(String id) {
        this.locks.remove(id);
    }

    public void getMoveLock(MoveModel moveModel) throws InterruptedException, ExceptionUserAlreadyPlayed, ExceptionNotPlayerTurn {
        //todo user does not exist exception
        PlayerId playerId = new PlayerId();
        playerId.setId_game(moveModel.game_id);
        playerId.setName(moveModel.player);
        System.out.println("Using locks of " + moveModel.game_id);
        int maxVote = 0;
        int team = userRepository.findByPlayerId(playerId.getId_game(), playerId.getName()).team;
        if(team == 0) {
            maxVote = gameRepository.findById(moveModel.game_id).get().w_players;
        } else {
            maxVote = gameRepository.findById(moveModel.game_id).get().b_players;
        }
        if(!locks.containsKey(moveModel.game_id))// todo retirer cette condition en prod
            this.locks.put(moveModel.game_id, new Lock());

        locks.get(moveModel.game_id).waitAllVotes(moveModel, maxVote, team);
    }

    public MoveModel getChosenMove (String id) {
        return locks.get(id).getChosenMove();
    }
}
