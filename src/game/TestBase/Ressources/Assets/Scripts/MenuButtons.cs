using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class MenuButtons : MonoBehaviour
{   
    [DllImport("__Internal")]
     public static extern int cnt;
    //public static int cnt;
    Text count;

    // Start is called before the first frame update
    void Awake()
    {   
        count = GetComponent<Text>();
        cnt = 0;
        count.text = "Init";
    }

    // Update is called once per frame
    void Update()
    {
        Debug.Log(cnt);
        count.text = "Compteur: " + cnt;
    }

}
