module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if(token !== '1ht21908g19unggb18670gbnfy89fn12y189fn2y89nf21y89fn12y89nf12y89nf12nyf93y79n193ay7asy79ny79nc7y379564g846er45s2s3df1sfc826cfgvbysach7h812f590nq1g3g21ghg2hy454jh54jyn' 
    && token !== 'd1230yfybcb8989ym89yz1mem8y9089my0e890my32yt707t0cvt73f4v9y78fyv9397b7byy9byb9yzq1y1y9ybxy23eyy79x2yeyx327ybn9vu890g543iuhghsjdgfhjksdgfoiug80p8238n9k0-09j2j2ugb') 
    return res.status(403).json({ message: 'Dostęp zabroniony' }); 

    next();
}