package main.java.Data.Translator;

import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Model.PlayerModel;

public class PlayerTranslater {

    public static PlayerEntity toEntity(PlayerModel playerModel) {
        PlayerEntity playerEntity = new PlayerEntity();
        playerEntity.name = playerModel.name;
        playerEntity.team = playerModel.team;
        playerEntity.id_game = playerModel.id_game;

        return playerEntity;
    }

    public static PlayerModel toModel(PlayerEntity playerEntity) {
        PlayerModel playerModel = new PlayerModel();
        playerModel.name = playerEntity.name;
        playerModel.team = playerEntity.team;
        playerModel.id_game = playerEntity.id_game;

        return playerModel;
    }
}
