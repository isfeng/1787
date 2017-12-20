export default class CCU extends Phaser.Group {

  constructor(game, bgasset, val, parent) {
    super(game, parent);

    // initialize your prefab here
    this.create(0, 0, null);

    var style = { font: "30px Arial", align: "center", fill: "#000", backgroundColor: '#FFF' };
    this.txtValue = new Phaser.Text(this.game, 55, 55, val.toString(), style);
    // this.txtValue.anchor.setTo(.5, .5);
    this.add(this.txtValue);

    var label = new Phaser.Text(this.game, 155, 55, "同上霸個", { fill: '#000', backgroundColor: '#fff' });
    // label.anchor.setTo(.5, .5);
    this.add(label);

  }

  setValue(val) {
    this.txtValue.text = val.toString();
  }
}
