/**
 * Created by addison on 2014/5/19.
 */


//材质类
function Material(o) {
    this.name = o.name;
    //阻力
    this.Resistance = o.resistance;
}


//内置材质
var BuiltIn_Material = {
    a: new Material({
        name: 'a',
        resistance: 10
    }),
    b: new Material({
        name: 'b',
        resistance: 10
    })
}

