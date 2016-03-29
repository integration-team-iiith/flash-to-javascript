library orifice;

import 'dart:math';
import 'dart:html' as html;
import 'package:stagexl/stagexl.dart';

//###########################################################################
//  Credits for "TheZakMan" on http://opengameart.org for the walking man.
//###########################################################################

Stage stage;
FlipBook flipBook;
RenderLoop renderLoop;
ResourceManager resourceManager;

void main() {

  // configure StageXL default options

  StageXL.stageOptions.renderEngine = RenderEngine.Canvas2D;
  StageXL.stageOptions.stageScaleMode = StageScaleMode.SHOW_ALL;
  StageXL.stageOptions.stageAlign = StageAlign.NONE;
  //StageXL.bitmapDataLoadOptions.webp = true; //*no idea


  // init Stage and RenderLoop

  stage = new Stage(html.querySelector('#stage'), width: 1024, height: 768);
  renderLoop = new RenderLoop();
  renderLoop.addStage(stage);

  // load resources

  resourceManager = new ResourceManager()
    ..addTextureAtlas("ta1", "images/orifice.json")
    ..addBitmapData("Background","images/1.png")
    ..addBitmapData("Button","images/buttons/DefineButton2_22/1.png")
    ..load().then((result) => startAnimation());
}

//-----------------------------------------------------------------------------

void startAnimation() {

  //var random = new Random();
  //var scaling = 0.5 + 0.5 * random.nextDouble();

  // Get all the "walk" bitmapDatas from the texture atlas.
  var background = new Bitmap(resourceManager.getBitmapData("Background"));
  stage.addChild(background);
  
  var upState = new Bitmap(resourceManager.getBitmapData("Button"));
  SimpleButton btn_st = new SimpleButton(upState,upState,upState,upState);
  btn_st.x=17459/20;
  btn_st.y=2753/20;
  stage.addChild(btn_st);
  btn_st.addEventListener(MouseEvent.MOUSE_DOWN,(me)=>(stDownHandler()));

  var textureAtlas = resourceManager.getTextureAtlas("ta1");
  var bitmapDatas = textureAtlas.getBitmapDatas("orifce");

  // Create a flip book with the list of bitmapDatas.

  var rect = stage.contentRectangle;

  flipBook = new FlipBook(bitmapDatas,10,false )
    ..x = rect.left + (11164/40)//- 128
    ..y = rect.top + (8916/40)//+ (scaling - 0.5) * 2.0 * (rect.height - 260)
    ..scaleX = 1.0//scaling
    ..scaleY = 1.0//scaling
    ..addTo(stage)
    ..addEventListener(Event.COMPLETE,(me) => stopAnimation(flipBook));

  
  

  // stage.sortChildren((c1, c2) {
  //   if (c1.y < c2.y) return -1;
  //   if (c1.y > c2.y) return  1;
  //   return 0;
  // });

  // Let's add a tween so the man walks from the left to the right.

  // var transition = Transition.linear;
  // var tween = new Tween(flipBook, rect.width / 200.0 / scaling, transition)
  //   ..animate.x.to(rect.right)
  //   ..onComplete = () => stopAnimation(flipBook);

  // stage.juggler
  //   ..add(flipBook);
  //   ..add(tween)
  //   ..delayCall(startAnimation, 1.00);
}

void stDownHandler(){
  flipBook.play();
  stage.juggler.add(flipBook);
  //stage.juggler.add(flipBook);
}

void stopAnimation(FlipBook flipbook) {
  stage.juggler
    ..remove(flipbook)
    ..delayCall(startAnimation,0);
}


