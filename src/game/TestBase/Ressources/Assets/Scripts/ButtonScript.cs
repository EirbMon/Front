using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonScript : MonoBehaviour
{       
    public void IncrCnt(){
        MenuButtons.cnt++;
        print(MenuButtons.cnt);
    }

    public void deacrCnt(){
        if ( MenuButtons.cnt > 0){
            MenuButtons.cnt = MenuButtons.cnt - 1;
        }
        print(MenuButtons.cnt);
    }

    public void reset(){
        MenuButtons.cnt = 0;
        print(MenuButtons.cnt);
    }
}
