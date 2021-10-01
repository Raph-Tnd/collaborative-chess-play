package main.java.Common.Synchronization;

import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionPlayerAlreadyVoted;
import java.util.HashMap;
import java.util.Map;

public class Lock {

    /**
     * Comme la vérification des votes déja existant, au moment de voter,
     * s'effectue dans le bloc synchronized il est important de réduire au maximum le temps
     * parcours de la colection des votes. Une HashMap<K, V> où K=nom du joueur et V=Piece jouée
     * reste la meilleure solution pour éviter de parcourir toute la collection.
     *
     */
    public Map<String, MoveModel> moves = new HashMap<>();

    public int votes = 0;

    public synchronized void waitAllVotes(int maxVote, MoveModel moveModel) throws InterruptedException, ExceptionPlayerAlreadyVoted {
        if(moves.containsKey(moveModel.player))
            throw new ExceptionPlayerAlreadyVoted(moveModel.player + " already voted for this turn"); //todo rejouer un pion

        moves.put(moveModel.player, moveModel);
        votes++;
        //System.out.println(votes + " = " + maxVote + " ? " + (votes == maxVote));
        if (votes != maxVote) {
            wait();
        } else {
            notifyAll();
            votes = 0;
            moves = new HashMap<>();
        }
    }
}