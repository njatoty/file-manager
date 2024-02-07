export const getParentPath = (path: string) => {
    let splitedPath = path.split('\\');
    splitedPath.pop();
    return splitedPath.join('\\');
}

export const getMimeType = (extention: string) => {

    switch (extention.toLowerCase()) {
        case '.img': case '.png' : case '.jpeg' : case '.jpg' : case '.ico' :
            return 'image';
        case '.mp4': case '.3gp' : case '.avi' : case '.mkv' :
            return 'video';
        default:
            return 'Fichier';
    }
}

export const getSize = (sizeInOctet: number) => {

    let x = 1024;
    if (sizeInOctet >= (x * x)) {
        const sizeInMegaByte = sizeInOctet / (1024 * 1024);
        return `${sizeInMegaByte.toFixed(2)} MB`;
    } else {
        let sizeInKiloByte = sizeInOctet / x;
        return `${sizeInKiloByte.toFixed(2)} KB`;
    }
}

// Base64 Images
export const NewFolderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADCElEQVR4nO3Z60tTcRzH8S+ChSmZl0wNtWdRRIiGlV3VpuaQOZ332wSxelD/QMgilXSVlKixTC1nKIp5QbOI8kkXTVNLc4YYWOYIysg9UFP8hEHEdL8N9ZyzDuwD72c7sBc7P86BEdlmm2222cbV9FqS6rU0qdcS1tNUDS3ptfRhSkuZZI1NVNHnT1UELpqopEuCA8ZvEzhNQ4WCAkbLCFynK6Pi4QpyFQQwdJPAdV/bAwHdGWD07Ib7NZix+O3JsVwmoP86gcv0bctfPofT5gdSF5mAnkICV002BwAj2bxErD3PJ2y0bvVmfGkNAkayeItYWxhIAt5n/vcRaxhOhxgiNiAVYoiYgKFkiCFiAxIhhogJeBcPMURMwNs4iCFiA+QQQ8QEDMoghogJGIiGGCI2QAoxRKwt9Z+GGCI2IAJiiJiANxJYo/k+CVqeSnHugRzBNQr4VcTBVyPHwTsyZNdJ0fQ4EnO9/z7PBvSFQejau6Q4XJcEr+pkeFYmwqMiAds1CriXx8KtNAYuJTJsuxEN/1tRaO2U/LnGDCAEQrXQF4K8Tjl2atPgfS/VIsC5WIqt16JwsV4CUqnsTAN6T0Co8h7J4XM/Y80AJ3UkHK+EF5kGvD4KIeroioRvvXIjADgUhMeYAASD7+Z7juB4c5pZwPScAd9nZ8wCthSc+kiq+E3GgJ5D4Lu2rgj4NWSZBfydeYAEDvmh8caA7iDw3fmHCu4Al0NrVwAOgO9OtqRzB8gLGzUGvAoA3+1tUq4C/JgzwNKWz4QJgGEFwB98ZwowvW5A6E8jwGzXnsWll/vBZyEtqVyeAZ0RYKrOO3f22e7FpRf7wFcXOmRcngEtCb1djVkJHP4CCsEBgZoce78G5ZjZB9nsjOUHWb5kfNWDTKj5NSpjN/wqkR8mI2vOpz7z6voBEmH/ujI5lcrOpzZDvVaAY1FkEfN12hrzqkmL8bqbMmYZEDXmpI6y7m3D2vLB9qxOid9RmVjrUZGgc9fEGdzK5QbXUpnOpURW61wsVZAm0N7Uxb8BAKI58th1T4AAAAAASUVORK5CYII=';
export const DeleteFolderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADz0lEQVR4nO2ZSWwbZRiGPyEF7hy5QCjQNGyup7HT4DR1Ejs4jpd4a5OQREFR4RD1gFQhDgUOSF0QSBx6AEQQdSSOCMQNCS5AV5qWhiYodbZ6Sep1PGki2yO/yIZgxp6fitQeM5Jf6ZGs0Yz0PqN/vv+XTNRII4000ki1EvGTNeKnYMRP2A3h85SP+On3sJ/GqR5ZnaY7a9OEarD6Gb2ruEDgE0JV+ZhOKyqwcI5QbebP0Ydzn9Kjigjc/IhQbTa+5YD514CF1x+Y7PUxMfZd50mmwLUPCNUk8k2h/LGqkpkdEZkCl04TqkXwKy1wa7ImECs/vkd4UC6efQShr3XArYmaQazkZo8Cv43/7yFWMDcKNUBsgRGoAWIK3ByCGiC2wBGoAWIK/OqFGiCmwA031ACxBQahBogpcN0BNUBMgVkb1ACxBaxQA8RK/poFaoDYAn1QA8QU+MWEunDZhOwXVmy/NYjNMQ8EhweC3QVh2ImtEzZkPrcU79m5ny1wtQdKk53px70xH4SBI0j3+5C2eJF+2Q3e7AJvGkSqx4lUtx2824rMtKn4zL8IGKEYV4zInLJDsA3dt3zysA3JrgEkDvVj620zQO88JC9wpQtKkTll+8/lEwYL4h19iOnNZ+QFLhugBNnzpl2Xj7ebEdP1IqrrdsoIdKDmXHgJ98a8FeU3p04g7RmvKJ+0HQU/eVxavq0bUa1xCa2tD0sFLrWj1mSne2TLI5eDuLwK3jVaKu8YhhhYAbI58BNTpfKcEXf3d+GuxuCVClzUodZsvzlQsWzSnvFi+ULEpRWknCOl8oVrgWXEzW5p+Rc7sfG8YaZM4ABqzeYrLtk1z7tGS4XvhCCurP35e2UNCYtPrjzWWw8uSAUuaFFrBIeb+cGmHCN/F98RYZXfeLYDkRa9UCagQa0R7IPMaZO0D0kF1oKIW7yy5df3tSPcouclAts/7BPzP7+AWiIM29jlA8t/vflg6ZtYXkXM5KooH2nRI/J027xEIPzlYye3v98r5n96DrVi641e2VEp/uODTfR5EDe7IN5eKl7LLS4h2mmVln+mDaE9nJ+UTqrX6SvfpPjJ48VRuVN+Z83HepzF8vlsFnHfq5Ly4acOINys8SguAO5YU+LwwGL5DstPTMmOysKblysfat4fmCvfyJRK8lC/S/Z40CY/bSre/JNahJ7QOKieSRgs7++2fPBxjbJ/XcmlcCSO6c1nd1H+DIjkj9P1SFTX7YxyxsX7lm/WLtZ92bACjmsqHMwKZ5v11o75wg4b3qsTCnM+vIebKUybqxzXJPfwHxD8vgSjdDYHAAAAAElFTkSuQmCC';
export const ArrowUpIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACQ0lEQVR4nO2VzU4TYRSGzy1gAtjE0PIPTqctddduXOqVwNKbMLqVhECHhVor+IOinZZOC1yCukFlUW3T/05nhuSLO1KPmQYWRCyHMm1PDU/yJF9yNu+z+gCu+U/xRA4WZbV2LKvVY/sNg4QncrDo14zfwf0jtA2kDXSvfXsAgzg+OEgRE8rXpfPGn2rf3E+/LwFH7qTNsF8zmsG9I2ynV601hx5+CQMnAvtmaGHXEgt7FlIcevRJDC8f8oiwxwcylgjsWkj1xuPPOPLkUAwvZ/sbEdBOxmcsvIwnATiykv01upq727fx/owl/BkLL+tpwOhKFm+u/uh9RGt82hT+tImdeCZg7adt7yIkzQz5NFP4NBM79a+ASA5ddsR6lyNa41Om8KVMvIrnBkRadi/CHi+nDCGnDLyq/wxQ8t2JkBJmSN4xhLxjoBO2DVAcjrDHe5OG8CYNdMoLAxSHIqSkGfYmDOFNGOikpADFjsgL13q+889OUvW8lGig05IDlJa5zgPiekxS9aakNtBJ6QG5pkvJRaFX3I43kCJwZT6uI0XgyvxHHSkCV+Y+6EgRuDK3XUeKwJXZ7TpSBK7Mvq8jReDKzLs6UgSuzGzVkCJwZXqrhhSBK9Nva0gRuDL1pooUgStTgx4w+bqKFIErk68qSBG4MrFZQYrAlfHNClIEroxvVJAicMXzsowUgSueWBkpAlfcsTJSBK64X5SQInBlLFpCisCVsYEPeF4qXhxQLABX3M+K99tHFAu3ooV7/d55DTjIH2rPmow0KNf0AAAAAElFTkSuQmCC';
export const ArrowLeftIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACtUlEQVR4nO2YS08TURiGzz8QorUtC1uYdqb0QmF7unGpvwS28hfAdWNA2wEXBpVLp6VQSgH1F8CWy6KxMwE6t04xOZmdoZ85krog7Ywmmpwx8yTv/n3ynW/O5CDk4+Pj81/Al9sJrqTOR8rtBPIanGRgrqSSWEkDbku1uQ3tKfIKgmTgmKSRuKRDTNLAUxKCZOB4WSN8WYc4jZck+LKR4ys64SsG8BUdBkpsqiRauhYQa/C7Ri6xrRNh2wAaR4mSOo+YK181SGLHhET1TmCYBF1sgaUJpKoGntw1yOSuCT8FHCRiZd3mJIZ2IFU3cLJmkmTNBCrgJBGv6LbAWvnUnkmSex1I1miGS/AVg7XyXZyuWyRV70CKCjhICNuGLVQZK59pWCS9b0G6boGThFA1baHaYaj8YRdnDiySaVhA4ySR2GGsfKR4NpfeN2+nDrqQObgTcJNwW+xh90Rsi97a9NLTYGJThYkNFcZp1mnaEP3YhuiHNkRo3rchsnZ9FXl39dyxfGbf7GUPuzBFw6DEk7Wry4Hlo+Lp7FSj08se3UD2qAssS6BB5bONTm/68w1Mf6ICbEug+6Rr2veZLzcwQwU8IIHuk9mjAt/AKxJo4BE6tHpekUDDltgrEmgYEytnc6xLRNfVwZ/RX5NYPZ1N1/VbFiXGN9VLbl19htwYXTjGI4snZPTlCbhlZPHYfrBwws6vRJ/AqwscyJ+RQP4c3PIof24/zF8wKPG6iYNLTRJcboJbHi837eBSk0EJsYlDhRYJFVvgmsJXO1iQfYl/QkBUcKgok5Aog2uKLTYnES4ouXBRJmFRBtcUZTL2psXOs0qf8KqSC4sKCa8o4JbQiszWw9YfSYgKGXvL4AT6jIkKHiohynZwlcEd+C0Jr5QfKOG18n3oWQ+J8gumz7yPj48P+tv8AKxJPzE7BenAAAAAAElFTkSuQmCC';
export const GridViewIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABKklEQVR4nO3Y22rCQBSFYV/EQ0WsttZY37ghQen5SCWmT+OYRpOJTzBZxctCCAsK7kL2B//drPvNtFpKKfUveesinEW2nK0LVBbZ8vhGYkOZrnI3XVnUlzuJDWXykYNJYkO5eMvAJLGhjJ73YJLYUIYPKZgkNpTB7TeYJDaU/iIBk8SG0guN64Vb1GecxIbS9k3Y8Teu4xtUt3HtGxNIbJQ6BU+POavH3ORPx9xrBiaJDWX0tAOTxIYyvE/BJLFpxjF3tkjAJLGhdAPjusEW9f0+sk61oegxp5ruOj6E87go518HVBYX5fGNxIbiRdZ5UYH6rJPYUK4+czBJbCiX7xmYJDaU8cseTBIbyvnjDkwSG8rgLgWTxIbSXyZgkthQ9GfO1585pVQT/ACE6pZq0JYHwwAAAABJRU5ErkJggg==';
export const ListViewIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABAklEQVR4nO2WT3KCMBjFOQYEPEzipngBhfRyJTlBlf4RTkNWdUTlBF8H66AkLeMunfb9Zn67b/HeJIsXBAAAAMBfgT91C1F0RqiOhDqRKI5G6Da17+JsvZitns0s21BvMlhezXtfBuOzr5ZvI1n+brklJq9G+daEee3kGRiFV0cS+kBcHRr7zkd4JiuKZEWhrJqfC1jhv2zJKeApfHRxooAbXuj9twV8hY9kPVHg/OfH4bnaOU+WrNbGV/hQ1hNfSLdp/+dvw8+Ljwf7Ll6WaZJtGh/hw8fKyQMAAL8Eji1UYgsxbCGNLUTYQgCAfwrHFiqxhRi2kMYWImwhAAAAILiPTyuw/FlKCjEfAAAAAElFTkSuQmCC';
export const UploadFolderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFb0lEQVR4nO2Ye0xTVxzHb7JsTudebm4DZJvDPXwxxYH4iA9QkdVHnBN1xDndwP2zLdE/hCYyH+BjWucUna1SbHmo2QYyqcBsUCttKRNw4hvlVWipgMJ0OgX6Xe4pYk+vt1Laykz6Sz4J4dz7+30/PecAgWE85SlPecpTripjCiMwyplao5yBIxhkjNkoZy4ZZMxipierWsroa6QMnKE6iVndYwJXxAxcQbmY2dgjAhd2MnAhW8/uYfo9VoEz2xi4kvrsUcCFZcDFr9FQ+AWEvvsQ45XSiWy0CvLgB/zx6SUK7bI6Cs2yOr02yhDOK1C8mYGrMGSx4aM7adB+DqGvjBKQBh6jBHLnXKAENFG1XInouhpeAe0GBq5AnxEAnP+Kokm7CGve30sJSAKUlIBiZhkloFpcxRFg4RVQrWXgDJqNvVCbFQScX8KhuSgSojGJlMCO4TmUQMa0YkpAGVEOTXRt1wVaSxcA5xa7hdvFkdg3P54SSPDLoATSxquRN/ciJZG/8ApHglcAZxfBXdw7HYmjccspAaFPGmSjj1MSmWElnMvM7gR7nNRRemij7QpEwl2YyyJRpfgMwgHWFzkVW4dkUwLyMSpkz6Lvgi38AmUL4U7+1s2DWLCJEhD6pCM5iN6F1LEFdiXsCMyHO2k9HYHi3UspgRivVM5dYEkJPonMsFLOnbAvcGYe3E2Ldo7VLqR2kIYtHxzmSJDdGKfGb1NPkR2x/J64aEfgr7lwN22ln6D8YATi/JIogVivNIh4JGyxIzAHj4M7RbNxIiEasd73dyGtk4RBmZDa3ImuC5yejcfFTa0AWd+u4Ais9E6H0Gc/RIMVnB+xjxYonQlX8a9OgKYT0wns17br5pKZaCkIh2LFN4j1pgXuE+tzAAmDDmH78FyIA5RICjxG/gC0I8AOcp5/tNPx6+8xGJdSiXHyCvySFUO+Z/ucuUSAm5owqOK/RJxfMkdgpff+Dg5YcZBfwFwSDme5rQ2D4vB3GCprxLvJLRgkbcZ70kZkHFpB1vjeKT8wGxLBemcF2AHd507hVBQolmDkPgMJ7pfUjHf23iAM3VuHY9lLyTMPe7f11DTcUIWieNcCiGckINY3tRsCxVPRXe4VTUFJTgRGyyo7wluCD9xzHW9LmvCWuAkfSiqgUyzEXd0Uu31aToagOnMajq6Kgmx+HERjd2DNYClifPY/QuBUKLrDPV0ILucIMFl+1ib4dRL8zd2N8P25EQN2NSBIUoZzR2aQd8x2erYVheBuYQhuFUzCjeMT0Zg/AdeUFuwITIajtBZNQs3RUMySax8SvKkzOIvPzmvwTjQhRKJGZd4U8m53ZvIL/DkRjtCmm4h65QQsSFFSwR986tbBr8FrhwlvbK/H6z/V42NJHozKCaSHo3P5BYrGwxFuqcZCmC6hzrn1caGDm0jw17YZ0f9HI17dasByaSLp4ehcOwJss65zSxWMuPREDBQ3dCm4JbyBhO8v0iMmWUR6ODqXX0AXDEdo0wajOT8QprxRnRiOBJDg1sflfnB2zfrZ5vxA0sPRufwChUFwFlPuSE5w9hN/RVRH1lwxg+EX+AjOYsodQZ1zNni/LXV4eXMtWXPFDIZXQBsAZzHl+FPB+22pJeFf+kFP1lwxg+EXGAFnMeUM6wj/IPiLm/R4YWMNWXPFDIav2tX+erPGH85gOjKEE/z5DTXou76arDnbv13tz/+vRZwcHt5eMFRvVg9DdzEpBnOC911fhecSqsiaM73b1cNqoBkynXF3WcKzwatJ8D7xlei9rpJ/6/9vZRv82bUV6LWm4skR6BNfRQV/ZvVVAvOkVO91VzWW8JbgT39/BU+tuqzu6Vye8hTDrf8Az9H00j6mAykAAAAASUVORK5CYII=';
export const UploadFileIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACR0lEQVR4nO2YT2/SYBzHn6QvBFlZYa2ldF59G/oGlhijZnrbadqj70MUFQFtgQ6oMUr8c9G78coGK23nVS8/U9onPG1aAiPj4TH9JJ/LQtvP97T2QSgjI+P/Rhm4GnegA3enC9zdPnD33gN3/wNwDz4CdzgE7uHn0C+Bj74Sfgsl/oZ/h687HAb38u/p39t/hv+sAx0qA+/pevGmqyknLtAaoJy4UDady42QO1NN7jrgS2uAHD5f7qw4QjKmmtSeApbWAIlokNr2ciNE3X4i6jaQ0hogxjr8toXxQtO+XWqdQ1xaA0oJLcWmfSt9QGP8Q2hMIC6ihJDQIryZfE+9gK+P/xbqE4iLKFFIaOHrkz+pF/Avx5DkRqvX6cm/OIMkESXyq/bkno2GueopRB192mj1Fvewx42Bd9MXsci+5T3ety5AtS6gYnmL/wFtG6r1+0i1PFAHgZXA9d4sN4Xad4/CYKj0o5Z7Wz5C8eOJYKXn685d5/X4qlF6rpYYTGpit2yEMotfFOyCbIbv9pd9x78qyqZzvFRw14HrnZiGc0x/QNf9JS8b3HaiHyn69CfaRtKCEStIONqYKxosDTCCYFHHBp+EiBXEMHjvXVTECns4+q0NJULECiUcTX6Mt84ZGtAKgovNqIgVimGw0MDSPd1YGeIIBHYJESvs4uj6XJrHMyuDgwuvxxERKxTCYP5VVMQKPI6eHUSdwU4oYoUdHF2bm6+xNKAWBEdP1E7ZGZAPg689j4pYIVcdDWfR1cDsSDAjIwOl8Q+JKJ01lP3r8wAAAABJRU5ErkJggg==';
export const RefreshIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAElEQVR4nO2ZPW/TYBSFo8DExlARJuLmo6XUcfsL+BOIFX4Fq7Mwd0IiyRIJErdpaYG2ifMhIYGYQAyUTkiEoY77YYcZloteO3auXTu14+tOPtKROj3nnJt0eZNKJUqUKFGi65bQ18u3ng3g9vMvsLBxDHde/ITMy1+QqQzhLnP1t+FMdfgpFFiEtDD485SZ/R1P+a5eXuuNIcgA5jDl1wd6fb0/BmahN5YefoCbsZQXqAeIkF7v6fW1/hgM90yTjmDlhe4YhK5umGyACGmBlZ+Utg5kZ8la9BElWROt4oKsQ0kmGiA6y+MD4Sw+ygihoz+2QLY7wQZkKsOPV5UXfErjLObVzpwjeFn75obxHS34P6dP+ZLMyuszS1tZfNv06uEcI/i29s8GIViU/oKs1VjxUoDSqLzpg4tauAE+sCgD+I525PWp8h2f0nZ5DVb2L76HC/OBRRkwM6dNnOO+wIODC8MkrZEuX5soB8Ns78c04CCGHAxjXpmYpPV15DiA7y2f0w/YjykHw5jvvzNN0vo6ctxAw2/jGHDuzKDKcQOXJyZpjYQzSHMwzPDemeHI4Fk5e2d0OW7gEvMu/YBllGNlkOS4gWRgl5biynEDi2+YT+kH7F7OIMmZAqfQ4g79gKJHRoEixw20TNIaySujsE0xwAW0nCJWwSMjT5GDoQyYb6mGSVojeWWEzinunP7wvsQUaHhLhRz2pgo5STlKRVAe81tTdjjItlrzuwSG4uKLmyPT0qgWecCWk78oqX/DUURI51tq/cprW6XN4sA1R1KqBTeiDMg5+OZhOGn0NTxpMuJyace1bV9VPlMdfrbfiSpD4+mFPcGwp5iFjWPjaYY90Xjxuebo0XznECGd21TrDigGm/BAl8ePXLMGLLoOk22OxPnKoxGcpNQd154WD/y1CTxAmvKjl3eNQKWBayqQfa0E/s4HHcBN+NnmCVF5PKKh1LmGAtlGuPJhBmQNNnV5NCL76uQJc9gfHtiPHEEG3Gso5XjKJ0qUKFGilL/+A+tBEV0tW1O0AAAAAElFTkSuQmCC';
export const CheckIcon = 'data:image/png;base64,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';


export const sortByType = (folders: Array<Folder>, asc?: boolean) => {

    const sorted = folders.sort((a, b) => {
        const aValue = a.isDirectory ? 1 : 0;
        const bValue = b.isDirectory ? 1 : 0;
        // For sorting in ascending order, use the following line:
        
        // For sorting in descending order, use the following line:
        return asc ? aValue - bValue : bValue - aValue;
    });

    return sorted;
}

export const getPathFromPublic = (path: string) => {
    const splitedPath = path.split('public');
    let newPath = splitedPath.pop();
    newPath = newPath?.replace(/\\/g, '/');
    return newPath || path;
}