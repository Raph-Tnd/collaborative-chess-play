package main.java.Synchronization;

import main.java.Data.Model.MoveModel;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class Monitor {
    public Map<String, Lock> locks = new HashMap<>();

    public synchronized void create(String id) {
        this.locks.put(id, new Lock());
    }

    public synchronized void delete(String id) {
        this.locks.remove(id);
    }

    public void getMoveLock(MoveModel moveModel) throws InterruptedException {
        locks.get(moveModel.game_id).waitAllVotes(moveModel);
    }
}
