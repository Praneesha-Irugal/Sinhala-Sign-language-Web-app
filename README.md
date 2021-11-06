# Sinhala Sign language detection Progressive web app.

## About AI Part🪐
Object detection is a computer technology related to computer vision and image processing that deals with detecting instances of semantic objects of a certain class (such as humans, buildings, or cars) in digital images and videos. Well-researched domains of object detection include face detection and Pedestrian Detection. Object detection has applications in many areas of computer vision, including image retrieval and video surveillance.
####
#### SSD MobileNet Architecture
The SSD architecture is a single convolution network that learns to predict bounding box locations and classify these locations in one pass. Hence, SSD can be trained end-to-end. The SSD network consists of base architecture (MobileNet in this case) followed by several convolution layers

![image](https://user-images.githubusercontent.com/56305868/140608957-b8fcaa07-4026-45a1-bb1c-2192cba04bc9.png)
####
By using SSD, we only need to take one single shot to detect multiple objects within the image, while regional proposal network (RPN) based approaches such as R-CNN series that need two shots, one for generating region proposals, one for detecting the object of each proposal. Thus, SSD is much faster compared with two-shot RPN-based approaches.
####
### Step 1- Prerequisites (Gather/Label images, Create label_map… )
####
🕸Gather and Label images
####
🕸Create label_map.pbtxt
####
🕸Download a pre-trained model to apply transfer learning
####
🕸Download generate_tfrecords.py script
####



