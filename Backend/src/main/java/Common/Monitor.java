package main.java.Common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Monitor {

    public int nb_vote = 0;

    @Autowired
    public GameRepository gameRepository;

    public synchronized void waitForAllVotes(String id) throws InterruptedException {
        int maxVote = gameRepository.findById(id).get().nb_players;
        nb_vote++;
        if(nb_vote != maxVote) {
            wait();
        } else {
            notifyAll();
        }
    }
}
