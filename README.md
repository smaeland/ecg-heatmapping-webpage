# ecg-heatmapping-webpage

Webpage for displaying multiple heatmaps, as an aid to comparing them.

## Functionality
The webpage shows a 3x3 grid of plots for the same ECG sample, but highlighted by different heatmapping methods.
Selectors are
 - Observable: Which feature to predict
 - Heatmap channels:
   - All: Show all 12 leads with separate heatmaps corresponding to their individual importance 
   - Averaged: Average the heatmaps across all 12 leads and display it on top of the data for lead V5
 - Model: Select between results for different ML models 
 - Sample number: Per now we have looked at 50 different representative ECGs, identified simply by number. The "Next sample" / "Previous sample" buttons at the bottom if the page goes back and forth more quickly
 - Blinding: Turn this on and the plots are shown in randomised order, without the label showing which heatmapping method is used. This should allow for a less biased evaluation of the methods. Press "Show labels" to get the labels back.

## Setting up your own webpage

The implementation is super simple, so manually editing the HTML and JS files is necessary for making (even simple) changes. Anyway, this is how to do so for your own version:
1. Fork this repository
2. Create plots (see https://github.com/smaeland/ecg-heatmapping-review)
3. In the `plots` directory, create a subdirectory for each of the different ML models to be compared
4. In this new subdirectory (`plots/my_model`), dump all the plots for all different observables and heatmap methods (so no further subdirectories). The plots should be named according to the convention below.
5. In `index.html`, add the new model subdirectory and name (and feel free to delete the other ones). 
  ```html
      <div class="col">
          <label for="model" class="form-label">Model</label>
          <select id="model" onChange="update()" class="form-select">
              <option value="model1">StevenNet 1</option>
              <option value="model2">StevenNet 2</option>
              <option value="model3">StevenNet 3</option>
              <option value="model4">StevenNet 4</option>
              <option value="my_model">My model name</option>   <!-- New entry -->
          </select>
      </div>
  ```
6. If changing the number of samples, the naming of the methods, or anything related to how the webpage works, edit `plots.js`
7. Push the changes to the repository. The webpage is served under [GitHub pages](https://pages.github.com/), which is enabled under "Settings -> GitHub Pages". Give it a minute to deploy.
8. The webpage is now available at http://username.github.io/ecg-heatmapping-webpage (in my case it is https://smaeland.github.io/ecg-heatmapping-webpage/)

#### Convention for plot filenames

The naming follows this rule:
```
<observable>-<heatmap method>_eventindex_<event number>[_average].png
```
which is the convention used in https://github.com/smaeland/ecg-heatmapping-review, so unless anything is changed here, the naming should automatically be correct. `eventindex` really just means sample number, so the number of the ECG data sample we are looking at. Example of a valid file name:
```
R_PeakAmpl_v5-deconvolution_eventindex_0_average.png
```

Possible observable names: "qt", "pr", "qrs", "STJ_v5", "T_PeakAmpl_v5", "R_PeakAmpl_v5", "VentRate"

Possible heatmap method names: "saliency", "deeplift", "smoothgrad", "inputxgradient", "integrated_gradients", "deconvolution", "guided_gradcam", "guided_backprop", "gradientshap"
