/**
 * Play counter for X-record
 * created by dev@obin.kr at 2021-05-03
 */

var points = document.getElementsByClassName("inner")[6].getElementsByTagName("strong");
var lm = parseInt(points[0].textContent);
var vm = parseInt(points[1].textContent);

function calc(lm, vm)
{
    if (lm == 0 && vm == 0) // not started
        return "Not started!"

    if (lm == 200)
        var lm_done = true;   

    if (vm == 200)
        var vm_done = true;

    if (lm_done && vm_done)
        return "Already Completed!"
    else
    {
        if (lm > vm) // use VM to determine play counts
        {
            let result = calc2(lm, vm);
            if (result == -99)
                return "Invalid LM/VM values!";
            
            return `${lm} LM, ${vm} VM\nPlay count: IIDX ${result[0]}, SDVX ${result[1]}`
        }
        else // use LM to determine play counts
        {
            let result = calc2(lm, vm);
            if (result == -99)
                return "Invalid LM/VM values!";
            
            return `${lm} LM, ${vm} VM\nPlay count: IIDX ${result[1]}, SDVX ${result[0]}`
        }
    }

}

function calc2(small, big)
{
    for (play_s = Math.trunc(small / 10), play_b = small % 10; play_s >= 0; --play_b)
        {
            // recalculate big
            let big2 = play_b * 10 + play_s;
            if (big == big2)
                return [play_s, play_b]
        }
        return -99;
}

var mystr = calc(lm, vm);
alert(mystr);