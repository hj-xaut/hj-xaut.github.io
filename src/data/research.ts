export const researchAreas = [
  {
    "number": "01",
    "title": "Intelligent Visual Enhancement",
    "intro": "Low-level visual processing and intelligent image enhancement under challenging imaging conditions.",
    "topics": [
      "Low-light Enhancement",
      "Atmospheric Turbulence",
      "Image Restoration",
      "Visual Enhancement",
      "SDR-to-HDR Conversion"
    ],
    "videos": [
      "videos/sdr.mp4",
      "videos/hdr.mp4"
    ],
    "caption": "Drag the white divider to compare the original SDR and HDR videos.",
    "href": "#low-level"
  },
  {
    "number": "02",
    "title": "Intelligent Visual Perception",
    "intro": "High-level visual perception and semantic understanding for complex environments.",
    "topics": [
      "Pedestrian Detection",
      "Keypoint Detection",
      "Object Detection",
      "Semantic Segmentation"
    ],
    "videos": [
      "videos/number_counting.mp4"
    ],
    "caption": "Typical Research Video",
    "href": "#high-level"
  },
  {
    "number": "03",
    "title": "Visual Mapping & Navigation",
    "intro": "Visual mapping, spatial perception, obstacle avoidance and autonomous navigation.",
    "topics": [
      "Visual SLAM",
      "3D Mapping",
      "Obstacle Avoidance",
      "Intelligent Navigation"
    ],
    "videos": [
      "videos/mono-mapping.mp4"
    ],
    "caption": "Typical Research Video",
    "href": "#navigation"
  }
] as const;

export const researchDetails = [
  {
    "id": "low-level",
    "number": "01",
    "title": "Intelligent Visual Enhancement",
    "description": "Research on intelligent image enhancement and visual quality improvement, including low-light enhancement, atmospheric turbulence restoration and other challenging imaging conditions.",
    "media": [
      {
        "src": "videos/atmospheric-turbulence.mp4",
        "label": "ATMOSPHERIC TURBULENCE",
        "title": "Atmospheric Turbulence Restoration",
        "description": "Restoration of turbulence-degraded imagery for clearer and more stable visual observation."
      }
    ]
  },
  {
    "id": "high-level",
    "number": "02",
    "title": "Intelligent Visual Perception",
    "description": "Research on high-level visual perception, including keypoint detection, pedestrian detection, object detection, semantic segmentation and multimodal perception.",
    "media": [
      {
        "src": "videos/可见光视频.mp4",
        "label": "VISIBLE SPECTRUM",
        "title": "Visible-light Perception",
        "description": "Visible-spectrum scene understanding for multimodal visual perception."
      },
      {
        "src": "videos/IR视频.mp4",
        "label": "INFRARED",
        "title": "Infrared Perception",
        "description": "Infrared sensing for robust perception under challenging illumination."
      }
    ]
  },
  {
    "id": "navigation",
    "number": "03",
    "title": "Visual Mapping & Navigation",
    "description": "Research on visual SLAM, 3D mapping, obstacle perception, obstacle avoidance, path planning and autonomous navigation.",
    "media": [
      {
        "src": "videos/导航与路径规划.mp4",
        "label": "AUTONOMOUS NAVIGATION",
        "title": "Navigation & Path Planning",
        "description": "Visual navigation, obstacle avoidance and path planning for autonomous systems."
      }
    ]
  }
] as const;
