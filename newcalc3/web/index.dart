library calc3_fla;

import 'dart:math';
import 'dart:html' as html;
import 'package:stagexl/stagexl.dart';

// dart global vars

Stage stage;
RenderLoop renderLoop;
ResourceManager resourceManager;

// migrated global vars

SimpleButton pauseanim;
var rootstack2;
TextFormat readformat;
Button plusminus;
Sprite exp;
Button lparen;
List otherbuts;
Button equal;
SimpleButton playanim;
Sprite arrow1;
Button dot;
Button C;
Button percent;
var readlen0;
Button star;
var sp;
Button Backspace;
List otherbutvals;
Button num0;
var tween;
Button num2;
Button num3;
Button num4;
Button num5;
Button minus;
Button num7;
Button num1;
Button num9;
Button num6;
SimpleButton backanim;
Button num8;
Button slash;
Sprite infixmv;
List stack;
Button plus;
var postfixstr;
var readlen;
TextField input;
var speed2;
var speed1;
var actno;
Button sqr;
Button rparen;
Button onebyx;
Sprite postfixmv;
nstack rootstack;
TextFormat undoformat;
var back;
List actions;

void Main(){

}

dynamic pop1(num param1)
{
  dynamic actrootmv = undefined;
  dynamic resmv = undefined;
  Function pop12 = null;
  num res = param1;
  void p12(TweenEvent param1)
  {
     actrootmv.removeChild(resmv);
     tween = new Tween(playanim,0.005, Transition.easeOutQuadratic)
       ..animate.x.to(x)
       ..onComplete = () => allactions;
  }
  pop12=p12;
  this.exp.txt.text = "\npopping the final result from stack";
  actrootmv = new Sprite();
  this.rootstack2.addChild(actrootmv);
  resmv = new tbox();
  resmv.txt.text = res;
  actrootmv.addChild(resmv);
  this.stack[this.sp--].txt.text = "";
  if(this.sp >= 0)
  {
     this.arrow1.y = this.stack[this.sp].y + this.rootstack.y + 5;
  }
  this.playtween(0,this.input.x + 200 - this.rootstack.x,this.stack[this.sp + 1].y,this.input.y - this.rootstack.y,resmv);
  this.tween.onComplete= () => pop12;
}

dynamic playtween(int param1,int param2,int param3,int param4,Sprite param5)
{
  this.tween = new Tween(param5,this.speed1,Transition.easeOutQuadratic)
    ..animate.y.to(param4);
  this.tween = new Tween(param5,this.speed1,Transition.easeOutQuadratic)
    ..animate.x.to(param2);
}

List arrmod(String param1)
{
  dynamic _loc2_ = param1.split("");
  RegExp expr = new RegExp(r"\d+")
  while(_loc3_ < _loc2_.length)
  {
     if(expr.hasMatch(_loc2_[_loc3_ - 1]) && (expr.hasMatch(_loc2_[_loc3_]) || _loc2_[_loc3_] == "."))
     {
        _loc2_[_loc3_ - 1] = _loc2_[_loc3_ - 1] + _loc2_[_loc3_];
        _loc2_.removeAt(_loc3_);
        _loc3_--;
     }
     _loc3_++;
  }
  return _loc2_;
}

dynamic pop2(String param1,num param2)
{
  dynamic num1 = undefined;
  dynamic num2 = undefined;
  dynamic resmv = undefined;
  dynamic opmv = undefined;
  dynamic eqmv = undefined;
  dynamic actrootmv = undefined;
  Function pop20 = null;
  Function pop21 = null;
  Function pop22 = null;
  Function pop23 = null;
  Function pop24 = null;
  Function pop25 = null;
  String op = param1;
  num res = param2;
  void pop20()
  {
     actrootmv.addChild(num1);
     playtween(0,0,num1.y,-260,num1);
     if(sp != -1)
     {
        tween.onComplete=()=>pop21;
     }
     else
     {
        tween.onComplete=()=>pop23;
     }
  };
  void pop21()
  {
     num2 = new tbox();
     num2.txt.text = stack[sp].txt.text;
     num2.y = stack[sp].y;
     stack[sp--].txt.text = "";
     if(sp >= 0)
     {
        arrow1.y = stack[sp].y + rootstack.y + 5;
     }
     tween = new Tween(playanim,0.005,Transition.easeOutQuadratic)
       ..animate.x.to(playanim.x);
     tween.onComplete=()=>pop22;
  }
  void pop22()
  {
     actrootmv.addChild(num2);
     playtween(0,-50,num2.y,-260,num2);
     tween.onComplete=()=>pop23;
  }
  void pop23()
  {
     readlen = readlen + (op.length + 1);
     postfixmv.txt.defaultTextFormat=readformat;
     opmv = new tbox();
     opmv.txt.text = op;
     opmv.x = -25;
     opmv.y = -260;
     actrootmv.addChild(opmv);
     eqmv = new tbox();
     eqmv.txt.text = "=";
     eqmv.x = 25;
     eqmv.y = -260;
     actrootmv.addChild(eqmv);
     resmv = new tbox();
     resmv.txt.text = res;
     resmv.x = 50;
     resmv.y = -260;
     actrootmv.addChild(resmv);
     tween = new Tween(playanim,speed1,Transition.easeOutQuadratic)
       ..animate.x.to(playanim.x)
       ..onComplete=()=>pop24;
  }
  void pop24()
  {
     playtween(50,0,-260,stack[sp + 1].y,resmv);
     tween.onComplete=()=>pop25;
  }
  void pop25()
  {
     arrow1.y = stack[++sp].y + rootstack.y + 5;
     stack[sp].txt.text = resmv.txt.text;
     rootstack2.removeChild(actrootmv);
     tween = new Tween(playanim,speed1,Transition.easeOutQuadratic)
       ..animate.x.to(playanim.x);
       ..onComplete=()=>alacations;
  }
  this.exp.txt.text = "popping the top elements and applying the operator functionon them and.adding it again on to the stack ";
  actrootmv = new Sprite();
  this.rootstack2.addChild(actrootmv);
  num1 = new tbox();
  num1.txt.text = this.stack[this.sp].txt.text;
  num1.y = this.stack[this.sp].y;
  this.stack[this.sp--].txt.text = "";
  if(this.sp != -1)
  {
     this.arrow1.y = this.stack[this.sp].y + this.rootstack.y + 5;
  }
  this.tween = new Tween(this.playanim,0.005,Transition.easeOutQuadratic)
    ..animate.x.to(this.playanim.x);
    ..onComplete=()=>pop20;
}

void place(MouseEvent param1)
{
  String _loc2_ = param1.target.name;
  dynamic _loc3_ = this.otherbuts.indexOf(_loc2_);
  dynamic _loc4_ = _loc2_.split("num")[1];
  if(_loc4_ != undefined)
  {
     this.input.text=this.input.text+_loc4_;
  }
  else if(_loc3_ != -1)
  {
     this.input.text=this.input.text+this.otherbutvals[_loc3_];
  }
  else
  {
     switch(_loc2_)
     {
        case "plusminus":
           this.input.text = "-(" + this.input.text + ")";
           break;
        case "onebyx":
           this.input.text = "1/(" + this.input.text + ")";
           break;
        case "C":
           this.rootstack.removeChild(this.rootstack2);
           this.rootstack2 = new MovieClip();
           this.rootstack.addChild(this.rootstack2);
           this.actions = new List();
           this.postfixmv.visible = false;
           this.infixmv.visible = false;
           this.exp.visible = false;
           this.infixmv.txt.text = "";
           this.infixmv.txt.text = "";
           this.input.text = "";
           break;
        case "Backspace":
           this.input.text = this.input.text.substring(0,this.input.text.length - 1);
           break;
        case "equal":
           this.input.text = this.calc(this.input.text);
           this.startanim();
     }
  }
}
num evalpost(List param1)
{
  dynamic _loc3_ = undefined;
  dynamic _loc5_ = undefined;
  dynamic _loc6_ = undefined;
  dynamic _loc7_ = undefined;
  param1 = param1.reverse();
  List _loc2_ = new List();
  while(param1.length != 0)
  {
     _loc3_ = param1.removeLast();
     if(!this.isoperator(_loc3_))
     {
        this.actions.add(new List("push2",_loc3_));
        _loc2_.add(_loc3_);
     }
     else
     {
        _loc5_ = num(_loc2_.removeLast());
        if(_loc2_.length != 0)
        {
           _loc6_ = num(_loc2_.removeLast());
        }
        else
        {
           _loc6_ = 0;
        }
        _loc7_ = this.ev(_loc6_,_loc5_,_loc3_);
        this.actions.add(new List("pop2",_loc3_,_loc7_));
        _loc2_.add(_loc7_);
     }
  }
  dynamic _loc4_ = _loc2_.removeLast();
  this.actions.add(new List("pop1",_loc4_));
  return _loc4_;
}

dynamic backfun(MouseEvent param1)
{
  this.back = 1;
  this.playanim.visible = true;
  this.pauseanim.visible = false;
  this.tween.complete();
  this.drawstack(10);
  List _loc2_ = this.actions[--this.actno].removeLast();
  this.readlen0 = _loc2_[0];
  this.readlen = _loc2_[1];
  if(this.readlen == 0)
  {
     this.postfixmv.txt.text = _loc2_[2];
     this.infixmv.txt.setTextFormat(this.undoformat);
     if(this.readlen0 > 0)
     {
        this.infixmv.txt.defaultTextFormat=this.readformat;
     }
     else
     {
        this.backanim.visible = false;
     }
  }
  else
  {
     this.postfixmv.txt.defaultTextFormat=this.undoformat;
     this.postfixmv.txt.defaultTextFormat=this.readformat;
  }
  this.exp.txt.text = _loc2_[3];
  this.arrow1.y = _loc2_[4];
  this.sp = _loc2_[5];
  List _loc3_ = _loc2_.removeLast();
  dynamic _loc4_ = 0;
  dynamic _loc5_ = 0;
  while(_loc5_ < _loc3_.length)
  {
     this.stack[_loc4_].txt.text = _loc3_[_loc4_++];
     _loc5_++;
  }
}

void allactions()
{
  if(this.actno < this.actions.length)
  {
     this.singleact(this.actno++);
  }
  else
  {
     this.end();
  }
}

String calc(String param1)
{
  this.infixmv.txt.text = param1;
  return String(this.evalpost(this.in2post(this.arrmod(param1))));
}

dynamic push0(String param1)
{
  this.exp.txt.text = "pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))";
  this.arrow1.y = this.stack[++this.sp].y + this.rootstack.y + 5;
  this.stack[this.sp].txt.text = param1;
  this.readlen0 = this.readlen0 + param1.length;
  this.infixmv.txt.defaultTextFormat=this.readformat;
  this.tween = new Tween(this.playanim,this.speed1,Transition.easeOutQuadratic)
    ..animate.x.to(this.playanim.x)
    ..onComplete=()=>this.allactions;
}

dynamic push2(num param1)
{
  this.exp.txt.text = "\n pushing the operand on to the stack";
  this.arrow1.y = this.stack[++this.sp].y + this.rootstack.y + 5;
  this.stack[this.sp].txt.text = param1;
  this.readlen = this.readlen + (String(param1).length + 1);
  this.postfixmv.txt.setTextFormat(this.readformat,0,this.readlen);
  this.tween = new Tween(this.playanim,this.speed1,Transition.easeOutQuadratic)
    ..animate.x.to(this.playanim.x)
    ..onComplete = ()=>this.allactions;
}

void singleact(int param1)
{
  dynamic _loc2_ = new List();
  dynamic _loc3_ = 0;
  while(this.stack[_loc3_].txt.text != "")
  {
     _loc2_.add(this.stack[_loc3_++].txt.text);
  }
  this.actions[param1].add(new List(this.readlen0,this.readlen,this.postfixmv.txt.text,this.exp.txt.text,this.arrow1.y,this.sp,_loc2_));
  if(this.actions[param1][0] == "push2")
  {
     this.add2(this.actions[param1][1]);
  }
  else if(this.actions[param1][0] == "pop2")
  {
     this.pop2(this.actions[param1][1],this.actions[param1][2]);
  }
  else if(this.actions[param1][0] == "pop1")
  {
     this.pop1(this.actions[param1][1]);
  }
  else if(this.actions[param1][0] == "push0")
  {
     this.add0(this.actions[param1][1]);
  }
  else if(this.actions[param1][0] == "pop0")
  {
     this.pop0(this.actions[param1][1]);
  }
  else if(this.actions[param1][0] == "push0")
  {
     this.add0(this.actions[param1][1]);
  }
}

dynamic frame1()
{
  addEventListener(MouseEvent.CLICK,this.place);
  this.otherbuts = new List("minus","plus","star","slash","percent","lparen","rparen","dot","sqr");
  this.otherbutvals = new List("-","+","*","/","%","(",")",".","^");
  this.actno = 0;
  this.speed1 = 1.5;
  this.speed2 = 0.5;
  this.input.restrict = "[0-9]\\+\\-\\%\\*\\(\\)\\.\\/^";
  addEventListener(KeyboardEvent.KEY_UP,this.keyPressed);
  this.readformat = new TextFormat();
  this.undoformat = new TextFormat();
  this.back = 0;
  this.pauseanim.addEventListener(MouseEvent.CLICK,this.pausefun);
  this.playanim.addEventListener(MouseEvent.CLICK,this.playfun);
  this.backanim.addEventListener(MouseEvent.CLICK,this.backfun);
  this.backanim.visible = false;
  this.playanim.visible = false;
  this.pauseanim.visible = false;
  this.postfixmv.visible = false;
  this.infixmv.visible = false;
  this.exp.visible = false;
  this.tween = new Tween(this.playanim,0.5,Transition.easeOutQuadratic)
    ..animate.x.to(this.playanim.x);
  this.readformat.color = 65280;
  this.undoformat.color = 0;
  this.rootstack2 = new Sprite();
  this.rootstack.addChild(this.rootstack2);
}

dynamic startanim()
{
  this.readlen0 = 0;
  this.readlen = 0;
  this.sp = -1;
  this.actno = 0;
  this.exp.visible = true;
  this.exp.txt.text = "";
  this.postfixmv.visible = true;
  this.postfixmv.txt.text = "";
  this.infixmv.visible = true;
  this.stack = new List();
  this.drawstack(10);
  this.playanim.visible = false;
  this.backanim.visible = true;
  this.pauseanim.visible = true;
  this.tween = new Tween(this.playanim,0.5,Transition.easeOutQuadratic)
    ..animate.x.to(this.playanim.x)
    ..onComplete=()=>this.allactions;
}

dynamic push0(String param1)
{
  this.readlen0 = this.readlen0 + param1.length;
  this.infixmv.txt.defaultTextFormat=this.readformat;
  if(param1 != ")")
  {
     this.postfixmv.txt.appendText(param1 + " ");
  }
  this.exp.txt.text = "\nappending the operand to the postfix string";
  this.tween = new Tween(this.playanim,this.speed1,Transition.easeOutQuadratic)
    ..animate.x.to(this.playanim.x)
    ..onComplete=()=>this.allactions;
}
      
num ev(num param1,num param2,String param3)
{
  switch(param3)
  {
     case "+":
        return param1 + param2;
     case "-":
        return param1 - param2;
     case "*":
        return param1 * param2;
     case "/":
        return param1 / param2;
     case "%":
        return param1 % param2;
     case "^":
        return Math.pow(param1,param2);
     default:
        return 0;
  }
}

void keyPressed(KeyboardEvent param1)
{
  if(param1.keyCode == Keyboard.ENTER)
  {
     this.input.text = this.calc(this.input.text);
     this.startanim();
  }
}

dynamic drawstack(int param1)
{
  this.rootstack.removeChild(this.rootstack2);
  this.rootstack2 = new Sprite();
  this.rootstack.addChild(this.rootstack2);
  dynamic _loc2_ = 0;
  while(_loc2_ < param1)
  {
     this.stack[_loc2_] = new nstack();
     this.stack[_loc2_].y = -_loc2_ * 25;
     this.rootstack2.addChild(this.stack[_loc2_]);
     _loc2_++;
  }
}

dynamic pausefun(MouseEvent param1)
{
  this.playanim.visible = true;
  this.pauseanim.visible = false;
  this.tween.complete();
}

List in2post(List param1)
{
  dynamic _loc3_ = undefined;
  dynamic _loc5_ = undefined;
  this.actions = new List();
  List _loc2_ = new List();
  dynamic _loc4_ = new List();
  dynamic _loc6_ = 0;
  while(_loc6_ < param1.length)
  {
     _loc5_ = param1[_loc6_];
     if(!this.isoperator(_loc5_))
     {
        _loc4_.add(_loc5_);
        this.actions.add(new List("push0",_loc5_));
     }
     else if(_loc5_ == "(")
     {
        _loc2_.add(_loc5_);
        this.actions.add(new List("push0",_loc5_));
     }
     else if(_loc5_ == ")")
     {
        this.actions.add(new List("push0",_loc5_));
        while(_loc2_[_loc2_.length - 1] != "(")
        {
           if(_loc2_.length == 0)
           {
              return new List();
           }
           _loc3_ = _loc2_.pop();
           _loc4_.add(_loc3_);
           this.actions.add(new List("pop0",_loc3_));
        }
        _loc3_ = _loc2_.pop();
        this.actions.add(new List("pop0",_loc3_));
     }
     else if(this.prcd(_loc5_) > this.prcd(_loc2_[_loc2_.length - 1]))
     {
        _loc2_.add(_loc5_);
        this.actions.add(new List("push0",_loc5_));
     }
     else
     {
        while(this.prcd(_loc5_) <= this.prcd(_loc2_[_loc2_.length - 1]))
        {
           if(_loc2_.length == 0)
           {
              return new List();
           }
           _loc3_ = _loc2_.pop();
           _loc4_.add(_loc3_);
           this.actions.add(new List("pop0",_loc3_));
        }
        _loc2_.add(_loc5_);
        this.actions.add(new List("push0",_loc5_));
     }
     _loc6_++;
  }
  while(_loc2_.length != 0)
  {
     _loc3_ = _loc2_.pop();
     _loc4_.add(_loc3_);
     this.actions.add(new List("pop0",_loc3_));
  }
  this.postfixstr = _loc4_.join(" ");
  return _loc4_;
}

bool isoperator(String param1)
{
  switch(param1)
  {
     case "+":
     case "-":
     case "*":
     case "/":
     case "^":
     case "%":
     case "(":
     case ")":
        return true;
     default:
        return false;
  }
}

dynamic playfun(MouseEvent param1)
{
  this.tween.complete();
  this.pauseanim.visible = true;
  this.backanim.visible = true;
  this.playanim.visible = false;
  if(this.back == 1)
  {
     this.back = 0;
     this.tween = new Tween(this.playanim,0.01,Transition.easeOutQuadratic)
       ..animate.x.to(this.playanim.x)
       ..onComplete=()=>this.allacations;
  }
  else
  {
     //this.tween.resume();
  }
}

int prcd(String param1)
{
  switch(param1)
  {
     case "+":
        return 2;
     case "-":
        return 3;
     case "*":
     case "/":
        return 4;
     case "^":
     case "%":
        return 6;
     case "(":
     case ")":
        return 1;
     default:
        return 1;
  }
}

dynamic pop0(String param1)
{
  dynamic actrootmv = undefined;
  dynamic resmv = undefined;
  Function pop01 = null;
  String res = param1;
  void pop01()
  {
     if(res != "(")
     {
        postfixmv.txt=postfixmv.txt+res + " ";
     }
     actrootmv.removeChild(resmv);
     tween = new Tween(playanim,0.005,Transition.easeOutQuadratic)
       ..animate.x.to(playanim.x)
       ..onComplete=()=>allactions;
  };
  this.exp.txt.text = "popping the operator from the stack and adding to the postfix string";
  actrootmv = new Sprite();
  this.rootstack2.addChild(actrootmv);
  resmv = new tbox();
  resmv.txt.text = res;
  actrootmv.addChild(resmv);
  this.stack[this.sp--].txt.text = "";
  if(this.sp >= 0)
  {
     this.arrow1.y = this.stack[this.sp].y + this.rootstack.y + 5;
  }
  var tlm=this.postfixmv.txt.getLineMetrics(this.postfixmv.txt.text.length - 1);
  dynamic rect = new Rectangle(tlm.x,tlm.y,tlm.width,tlm.height);
  this.playtween(this.stack[this.sp + 1].x,this.postfixmv.x + rect.x + 156 - this.rootstack.x,this.stack[this.sp + 1].y,this.postfixmv.y - this.rootstack.y,resmv);
  this.tween.onComplete=()=>pop01;
}