package main.java.Common.Synchronization;

import main.java.Common.GameRepository;
import main.java.Common.UserRepository;
import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionPlayerAlreadyVoted;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class Monitor {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Lock> locks = new HashMap<>();

    public synchronized void create(String id) {
        System.out.println("Added lock for game " + id);
        this.locks.put(id, new Lock());
    }

    public synchronized void delete(String id) {
        this.locks.remove(id);
    }

    public void postMove(MoveModel moveModel) throws InterruptedException, ExceptionPlayerAlreadyVoted {
        PlayerEntity playerEntity = userRepository.findById(moveModel.player).get(); //todo user not found exception
        int maxVote;
        if (playerEntity.team == 0) {
            maxVote = gameRepository.findById(playerEntity.id_game).get().w_players;
        } else {
            maxVote = gameRepository.findById(playerEntity.id_game).get().b_players;
        }
        locks.get(playerEntity.id_game).waitAllVotes(maxVote, moveModel);
    }

    public List<MoveModel> getVotes(String id) {
        return new ArrayList<>(locks.get(id).moves.values());
    }
}
