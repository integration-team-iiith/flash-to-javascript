To Do List
=============================================

There are three independent areas in terms of building the converter:  

+ Export of assets to AS3 format 
+ A runtime written in AS3
+ Writing AS3 Libraries for Jangaroo

Export to AS3 format
---------------------------------------------
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
---------------------------------------------
_____________________________________________

A lot of necessary AS3 libraries and subsequent methods which are being used in our experiments are missing in Jangaroo.  
The deplist.out file lists the AS3 libraries required by present experiments.  
Amongst these completetion of flash.* packages is topmost priority.  

| Flash Packages                              | Nos |
|---------------------------------------------|-----|
| flash.accessibility.*                       | 45  |
| flash.accessibility.AccessibilityProperties | 4   |
| flash.desktop.*                             | 32  |
| flash.display.*                             | 60  |
| flash.display.Bitmap                        | 8   |
| flash.display.BitmapData                    | 4   |
| flash.display.BlendMode                     | 1   |
| flash.display.CapsStyle                     | 1   |
| flash.display.DisplayObject                 | 108 |
| flash.display.DisplayObjectContainer        | 17  |
| flash.display.GradientType                  | 3   |
| flash.display.Graphics                      | 4   |
| flash.display.IBitmapDrawable               | 1   |
| flash.display.InteractiveObject             | 32  |
| flash.display.JointStyle                    | 1   |
| flash.display.Loader                        | 19  |
| flash.display.LoaderInfo                    | 5   |
| flash.display.MovieClip                     | 360 |
| flash.display.PixelSnapping                 | 1   |
| flash.display.Shape                         | 14  |
| flash.display.SimpleButton                  | 23  |
| flash.display.Sprite                        | 44  |
| flash.display.Stage                         | 18  |
| flash.display.StageAlign                    | 2   |
| flash.display.StageDisplayState             | 1   |
| flash.display.StageScaleMode                | 2   |
| flash.errors.*                              | 45  |
| flash.errors.IOError                        | 2   |
| flash.events.*                              | 60  |
| flash.events.ContextMenuEvent               | 1   |
| flash.events.ErrorEvent                     | 33  |
| flash.events.Event                          | 131 |
| flash.events.EventDispatcher                | 27  |
| flash.events.FocusEvent                     | 20  |
| flash.events.HTTPStatusEvent                | 1   |
| flash.events.IEventDispatcher               | 10  |
| flash.events.IOErrorEvent                   | 20  |
| flash.events.KeyboardEvent                  | 33  |
| flash.events.MouseEvent                     | 61  |
| flash.events.ProgressEvent                  | 12  |
| flash.events.SecurityErrorEvent             | 15  |
| flash.events.StatusEvent                    | 1   |
| flash.events.TextEvent                      | 3   |
| flash.events.TimerEvent                     | 13  |
| flash.external.*                            | 45  |
| flash.external.ExternalInterface            | 6   |
| flash.filters.*                             | 46  |
| flash.filters.ColorMatrixFilter             | 1   |
| flash.filters.DropShadowFilter              | 3   |
| flash.filters.GlowFilter                    | 16  |
| flash.geom.*                                | 45  |
| flash.geom.ColorTransform                   | 12  |
| flash.geom.Matrix3D                         | 2   |
| flash.geom.Matrix                           | 7   |
| flash.geom.Point                            | 13  |
| flash.geom.Rectangle                        | 15  |
| flash.geom.Transform                        | 1   |
| flash.geom.Vector3D                         | 2   |
| flash.media.*                               | 48  |
| flash.media.ID3Info                         | 1   |
| flash.media.Sound                           | 1   |
| flash.media.SoundChannel                    | 1   |
| flash.media.SoundLoaderContext              | 1   |
| flash.media.SoundTransform                  | 1   |
| flash.net.*                                 | 48  |
| flash.net.LocalConnection                   | 2   |
| flash.net.SharedObject                      | 1   |
| flash.net.URLLoader                         | 7   |
| flash.net.URLLoaderDataFormat               | 5   |
| flash.net.URLRequest                        | 27  |
| flash.net.URLStream                         | 1   |
| flash.net.navigateToURL                     | 6   |
| flash.printing.*                            | 45  |
| flash.profiler.*                            | 45  |
| flash.sampler.*                             | 45  |
| flash.system.*                              | 45  |
| flash.system.ApplicationDomain              | 13  |
| flash.system.Capabilities                   | 2   |
| flash.system.IME                            | 10  |
| flash.system.IMEConversionMode              | 10  |
| flash.system.LoaderContext                  | 17  |
| flash.system.Security                       | 8   |
| flash.system.SecurityDomain                 | 1   |
| flash.text.*                                | 45  |
| flash.text.Font                             | 1   |
| flash.text.GridFitType                      | 1   |
| flash.text.TextField                        | 93  |
| flash.text.TextFieldAutoSize                | 9   |
| flash.text.TextFieldType                    | 26  |
| flash.text.TextFormat                       | 63  |
| flash.text.TextFormatAlign                  | 34  |
| flash.text.engine.*                         | 32  |
| flash.ui.*                                  | 45  |
| flash.ui.ContextMenu                        | 1   |
| flash.ui.ContextMenuItem                    | 1   |
| flash.ui.Keyboard                           | 23  |
| flash.ui.Mouse                              | 2   |
| flash.utils.*                               | 70  |
| flash.utils.ByteArray                       | 30  |
| flash.utils.Dictionary                      | 35  |
| flash.utils.Endian                          | 2   |
| flash.utils.IDataInput                      | 1   |
| flash.utils.Timer                           | 13  |
| flash.utils.clearInterval                   | 3   |
| flash.utils.clearTimeout                    | 4   |
| flash.utils.describeType                    | 3   |
| flash.utils.getDefinitionByName             | 27  |
| flash.utils.getQualifiedClassName           | 28  |
| flash.utils.getQualifiedSuperclassName      | 11  |
| flash.utils.getTimer                        | 6   |
| flash.utils.setInterval                     | 3   |
| flash.utils.setTimeout                      | 4   |
| flash.xml.*                                 | 45  |
| o 2                                         |     |

Runtime written in AS3
---------------------------------------------
_____________________________________________

A runtime script written in AS3 will be needed to guide the flow of exported AS3 assets. This is intented to take care of FrameHandling and the actionsript within frames.
