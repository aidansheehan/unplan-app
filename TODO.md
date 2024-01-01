### TODO MVP

[x] Ensure lesson plan displayed nicely and PRINTS well
[x] Generate mats
[x] Init firebase project with firebase storage
    [x] Save lesson plans to server on generation
    [x] Navigate to page for this lesson so at least links to lessons are sharable and reloadable
        [x] Find lesson by ID in db, retrieve handout and plan markdown, display
            [x] Fix crazy long page load times
                [x] Implement placeholder content for LP + Handouts, disable print btn while loading
[ ] Implement a LESSON LIBRARY
    [x] Lessons displayed in lesson library, click to link to lessons
    [x] Only display lessons with public flag
    [ ] Add example lessons
    [x] Implement search bar
[x] Feedback page
[x] Implement basic site navigation
[x] Implement basic user lessons lib
[x] Implement a really basic terms of use page
[x] LOADING PAGE Improve loading page as is quite a long load time (after generate lesson - give a message,  countdown and indication of time to process, whatever)
[x] FORM IMPROVEMENTS: Add placeholder example text to form inputs to show ppl how to use, fix lesson duration (should specify units, have suggestions), add student age group
[x] Implement sign up to mailing list
    [x] Mailing list page
    [x] Handle mailing list
    [x] Welcome email
    [x] Handle ALREADY SUBSCRIBED
    [x] Handle error
[x] Improve landing page
[x] Fix landscape menu broken
[x] Fix / standardize lesson lib + your lessons layout
[x] Add padding to top of text display components so text not flush with top.
[x] Error handling
[x] Age group should also demand user selction like level for consistent UX

### Immediate Extra
[ ] Improve load screen - can handle lesson plan + mats seperately, then display a green lesson plan created! generating materials ... for user experience of PROGRESS. Maybe also implement a TIMEOUT and display error screen if it takes like a minute?
[ ] Should maybe have checkbox 'generate handout activities' so users can decide if they want them or not? + 'Generate materials for this lesson' on other page

### Extra
[ ] Implement star rating for lesson plans, save ratings to server too
[ ] Implement a dialog to request a second lesson plan - user can write their probs with lesson plan 1, generate a second, then choose which of the two plans to proceed with (for mats generation)
[ ] Revisit newsletter already subscribbed code 400 hack
[ ] Animate header menu (mobile)
[ ] Animate open lesson plan / open mats
[ ] Investigate better handling of raw HTML - can you process as close as possible to PDF?