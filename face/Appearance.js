/**
 * Created by addison on 2014/5/19.
 */

//皮肤类
function Appearance(o) {
    this.color = o.color;
    this.cls = o.cls;
    this.material = o.material;
}


//内置皮肤
var BuiltIn_Appearance = {
    a: new Appearance({
        color: 'red',
        cls: 'tank-a',
        material: BuiltIn_Material.a
    }),
    b: new Appearance({
        color: 'green',
        cls: 'tank-b',
        material: BuiltIn_Material.b
    }),
    c: new Appearance({
        color: 'black',
        cls: 'bullet-1',
        material: BuiltIn_Material.a

    }),
    o1: new Appearance({
        cls: 'o-1',
        material: BuiltIn_Material.a
    }),
    o2: new Appearance({
        cls: 'o-2',
        material: BuiltIn_Material.a
    }),
    o3: new Appearance({
        cls: 'o-3',
        material: BuiltIn_Material.a
    }),
    buff1: new Appearance({
        cls: 'buff-1',
        material: BuiltIn_Material.a
    }),
    buff2: new Appearance({
        cls: 'buff-2',
        material: BuiltIn_Material.a
    })
}