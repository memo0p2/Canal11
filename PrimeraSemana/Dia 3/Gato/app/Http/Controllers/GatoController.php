<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\In;

class GatoController extends Controller{

    public function create(){
        $usuariosActuales=User::count();
        $usuario=new User();
        $bandera=0;
        if($usuariosActuales==0){
            $usuario->name = "Jugador 1";
            $usuario->tablero = "000000000";
            $usuario->turno = true;
            $usuario->ganador = false;
            $usuario ->save();
            $bandera=1;
        }else if($usuariosActuales==1){
            $usuario->name = "Jugador 2";
            $usuario->tablero = "000000000";
            $usuario->turno = false;
            $usuario->ganador = false;
            $usuario ->save();
            $bandera=1;
        }
        
        if ($bandera) {
            return response()->json(array(
                'id'=>$usuario->id,
                'name'=>$usuario->name,
                'turno'=>$usuario->turno,
                'tablero'=>$usuario->tablero,
                'ganador'=>$usuario->ganador,
            )
            , 200);
        }else{
            return response()->json(array(
                'msj'=>"Ya hay dos jugadores",
            )
            , 400);
        }
    }

    public function obtener(int $auxi){
        $id=($auxi==1)? 2:1;
        $user= User::find($id);
        return response()->json(array(
            'id'=>$user->id,
            'name'=>$user->name,
            'turno'=>$user->turno,
            'tablero'=>$user->tablero,
            'ganador'=>$user->ganador,
        )
        , 200);
    }

    public function nuevo(){
        User::truncate();
        return view('home');
    }

    static function detectarGanador($tablero,$valor){

        if ($tablero[0]==$valor && $tablero[1]==$valor && $tablero[2]==$valor) {
            return 1;
        }

        if ($tablero[3]==$valor && $tablero[4]==$valor && $tablero[5]==$valor) {
            return 1;
        }

        if ($tablero[6]==$valor && $tablero[7]==$valor && $tablero[8]==$valor) {
            return 1;
        }

        if ($tablero[0]==$valor && $tablero[3]==$valor && $tablero[6]==$valor) {
            return 1;
        }

        if ($tablero[1]==$valor && $tablero[4]==$valor && $tablero[7]==$valor) {
            return 1;
        }

        if ($tablero[2]==$valor && $tablero[5]==$valor && $tablero[8]==$valor) {
            return 1;
        }

        if ($tablero[0]==$valor && $tablero[4]==$valor && $tablero[8]==$valor) {
            return 1;
        }

        if ($tablero[2]==$valor && $tablero[4]==$valor && $tablero[6]==$valor) {
            return 1;
        }
    }

    public function move(User $user, int $lugar){
        $valor=0;
        $auxTablero="";
        $valor=($user->id==1)? 1:2;

        if (!$user->turno){
            return response()->json(array(
                'msj'=>"No es tu turno",
            )
            , 400);
        }

        $aux=$user->tablero;

        if($lugar>8){
            return response()->json(array(
                'msj'=>"No existe esa casillas",
            )
            , 400);
        }

        if(!$aux[$lugar]=='0'){
            return response()->json(array(
                'msj'=>"La casilla ya esta ocuapada",
            )
            , 400);
        }

        $auxTablero=substr_replace($aux,$valor,$lugar,1);
        $user->tablero=$auxTablero;
        $user->turno=false;
        $user ->save();

        if($valor==1){
            $otherUser= User::find(2);
            $otherUser->turno=true;
            $otherUser->tablero=$auxTablero;
            $otherUser ->save();
        }else if ($valor==2){
            $otherUser= User::find(1);
            $otherUser->turno=true;
            $otherUser->tablero=$auxTablero;
            $otherUser ->save();
        }

        if($this->detectarGanador($auxTablero,$valor)){
            $user->ganador=true;
        }

        return $user;
        
    }

    
}
