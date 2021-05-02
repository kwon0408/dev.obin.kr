/**
 * Play counter for X-record
 * created by dev@obin.kr at 2021-05-03
 * 
 * Usage: 
 * 1. Go to X-record page at https://p.eagate.573.jp/game/bemani/x_record/
 * 2. Input a single letter "j" (without the outermost quotes) in the address bar
 *    (Don't press Enter yet)
 * 3. Copy this text: "avascript:$.getScript('https://dev.obin.kr/scripts/xrecord.js');"
 *    (without the outermost quotes) 
 * 4. Paste this into the address bar and press Enter
 */

var points = document.getElementsByClassName("inner")[6].getElementsByTagName("strong");
var lm = parseInt(points[0].textContent);
var vm = parseInt(points[1].textContent);

function calc(lm, vm)
{
    if (lm == 0 && vm == 0) // not started
        return "Not started!"

    if (lm == 200)
    {
        if (vm == 200)
            return "Already Completed!"
        else // LM done, VM not done
        {
            let vm2 = 200 - vm;
            return `${lm} LM, ${vm} VM\nPlay SDVX Valkyrie ${vm2} more time(s)\n or IIDX Lightning ${Math.trunc(vm2 / 10) + 1} more time(s)`
        }
    }
    else // LM not done
    {
        if (vm == 200)
        {
            let lm2 = 200 - lm;
            return `${lm} LM, ${vm} VM\nPlay IIDX Lightning ${lm2} more time(s)\n or SDVX Valkyrie ${Math.trunc(lm2 / 10) + 1} more time(s)`
        }
        else // LM and VM not done
        {
            if (lm > vm) // use VM to determine play counts
            {
                let result = calc2(lm, vm);
                console.log(result);
                if (result == -99)
                    return "Invalid LM/VM values!";
                
                return `${lm} LM, ${vm} VM\nPlay count: IIDX Lightning ${result[0]}, SDVX Valkyrie ${result[1]}`
            }
            else // use LM to determine play counts
            {
                let result = calc2(lm, vm);
                console.log(result);
                if (result == -99)
                    return "Invalid LM/VM values!";
                
                return `${lm} LM, ${vm} VM\nPlay count: IIDX Lightning ${result[1]}, SDVX Valkyrie ${result[0]}`
            }
        }
    }

}

function calc2(small, big)
{
    console.log(`calc2(${small}, ${big})`)
    for (play_s = Math.trunc(small / 10), play_b = small % 10; play_b >= 0; --play_b, play_s += 10)
        {
            // recalculate big
            let big2 = play_b * 10 + play_s;
            console.log(`play_s=${play_s}, play_b=${play_b}`)
            if (big == big2)
                return [play_s, play_b]
        }
        return -99;
}

var mystr = calc(lm, vm);
alert(mystr);