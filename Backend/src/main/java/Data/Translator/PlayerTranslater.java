package main.java.Data.Translator;

import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Entity.PlayerId;
import main.java.Data.Model.PlayerModel;

public class PlayerTranslater {

    public static PlayerEntity toEntity(PlayerModel playerModel) {


        PlayerEntity playerEntity = new PlayerEntity();
        playerEntity.id = new PlayerId();
        playerEntity.id.setName(playerModel.name);
        playerEntity.team = playerModel.team;
        playerEntity.id.setId_game(playerModel.id_game);


        return playerEntity;
    }

    public static PlayerModel toModel(PlayerEntity playerEntity) {
        PlayerModel playerModel = new PlayerModel();
        playerModel.name = playerEntity.id.getName();
        playerModel.team = playerEntity.team;
        playerModel.id_game = playerEntity.id.getId_game();

        return playerModel;
    }
}
