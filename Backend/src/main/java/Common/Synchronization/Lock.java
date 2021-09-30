package main.java.Common.Synchronization;

import main.java.Data.Model.MoveModel;

import java.util.ArrayList;

public class Lock {

    public ArrayList<MoveModel> moves = new ArrayList<>();

    public int votes = 0;

    public synchronized void waitAllVotes(int maxVote, MoveModel moveModel) throws InterruptedException {
        moves.add(moveModel); //todo already played exception
        votes++;
        //System.out.println(votes + " = " + maxVote + " ? " + (votes == maxVote));
        if (votes != maxVote) {
            wait();
        } else {
            notifyAll();
            votes = 0;
            moves = new ArrayList<>();
        }
    }
}