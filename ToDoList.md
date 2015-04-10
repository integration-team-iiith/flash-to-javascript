To Do List
=============================================

There are three independent areas in terms of building the converter:  

+ Export of assets to AS3 format 
+ A runtime written in AS3
+ Writing AS3 Libraries for Jangaroo

Export to AS3 format
_____________________________________________
A feature to support export of assets like shapes, morphshapes, text, font, images, movieclip, sounds to AS3 is required to be added in the JPEXS Decompiler. For this equivalent exporters need to be written.  
[Link to Github Repository of Decompiler](https://github.com/jindrapetrik/jpexs-decompiler)  
The following list of scripts will need to be implemented in Java:  
+ MovieExporter.java
+ SoundExporter.java
+ ShapeExporter.java
+ MorphShapeExporter.java
+ TextExporter.java
+ FontExporter.java
+ ImageExporter.java  
Implementation of these will require use of the AS3 API reference. [Link to AS3 reference](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3) 

Additionally a method in SWF.java for framesToAS3 will need to be written, which will facilitate export of frames in AS3.  

AS3 Libraries for Jangaroo
_____________________________________________

A lot of necessary AS3 libraries and subsequent methods which are being used in our experiments are missing in Jangaroo.  
The deplist.out file lists the AS3 libraries required by present experiments.  
Amongst these completetion of flash.* packages is topmost priority.  


Runtime written in AS3
_____________________________________________

A runtime script written in AS3 will be needed to guide the flow of exported AS3 assets. This is intented to take care of FrameHandling and the actionsript within frames.
