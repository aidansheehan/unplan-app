# TODO MVP

[x] Ensure lesson plan displayed nicely and PRINTS well
[x] Generate mats
[x] Init firebase project with firebase storage
    [x] Save lesson plans to server on generation
    [x] Navigate to page for this lesson so at least links to lessons are sharable and reloadable
        [x] Find lesson by ID in db, retrieve handout and plan markdown, display
            [x] Fix crazy long page load times
                [x] Implement placeholder content for LP + Handouts, disable print btn while loading
[x] Implement a LESSON LIBRARY
    [x] Lessons displayed in lesson library, click to link to lessons
    [x] Only display lessons with public flag
    [x] Add example lessons
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
[x] Fix signup
[?] fix feedback form not working (use brevo smtp client?)
[x] Windows dt issues
    [x] Scroll on nav - investigate, either use custom scroll or remove scroll (what do other apps with sidebars do?)
    [x] Header overlap main scroll
    [x] Maybe smaller main text on  homepage by 1? Set up A /B and ask mum thoughts + possible smaller text on nav text
[x] Browser compat. issues
    [x] Fix overscroll ugly
    [x] Prevent overscroll where possible
    [x] Safari dt can't see lesson cards
[x] Prevent abuse / 'Security'
    [x] Implement rate limiting on openAI cloud functions at 1000 calls / day w/ email notification if triggered
    [x] Validate cloud function input
        [x] Reject if incorrect
        [x] Impose size limits to prevent massive inputs (Implement on BE & FE) 
        [x] Implement on FE too
[x] Implement basic activity generation so can test vs lesson planning as core VP
    [x] Activity display page
    [x] Activity generation cloud function
        [x] Find sb who
        [x] Grammar / Vocabulary Worksheet
        [x] Reading Comprehension
    [x] Nav page
    [x] Activity generation form
        [x] Find sb who
        [x] Grammar / Vocabulary Worksheet
        [x] Reading Comprehension
    [x] Rate limiting
        [x] Find sb who + TEST
        [x] Grammar/ Vocabulary Worksheet + TEST
        [x] Reading Comprehension + TEST
    [x] Add to sidebar
    [x] Move terms somewhere less intrusive to reduce clutter (Can be part of landing page refactor)
    [x] Refactor FullPageLoading to handle different activities (maybe show instructions instead of teaching tips)
    [x] Make display work (see below, especially for tables)
    [x] Add 'My Activities' under activity bit stored in local storage
    [x] Update Landing Page to advertise both VPs
    [x] Add CTA to feedback in /activities - 'is there an activity you would like but don't see, tell us about it'?
[x] Remove title from layout, standardize like in My Activities everywhere else (<TitleComponent>)\
[x] Test
    [x] Chrome
    [x] Safari
    [x] Firefox
    [x] Windows
    [x] Mobile
[x] Make Public

## BRANCHES
### editable-content
    [x] Add tinymce & setup, self host
    [x] Remove unhelpful toolbar options
    [ ] save
        [ ] Restructure / HTML files?
            [x] Convert md to html in db (copy, double up as below)
            [x] Save as HTML
            [ ] save two (plan.html, plan-initial.html) on creation
            [x] Retrieve as HTML
        [x] Add save button to editor and check working
        [x] hook up with in editor save btn and test
        [x] Autosave
        [x] Public lessons 'lock' editor so can't update
    [x] Plan page refactor (use linguahouse as guide)
        [x] Metadata section at top, small text
        [x] Plan, handout just nice simple components use page scroll to view, horizontal line breaks to split out content
        [x] Media (audio & pictures) - Leave a 'Coming Soon...' with CTA mailing list
    [x] Handouts
        [x] Move handout generation to plan page
        [x] Use tinymce for handout, implement save functionality
        [x] Make sure you STRIP HTML and pass in lesson plan to GPT as string for better results

### Clean up Editable Content
    [ ] Block edits to public lessons on backend in cloud fn
    [ ] Add 'use GPT-4' tickbox, set user expectations ~20s for GPT-3.5, ~2 mins for GPT-4.
    [ ] Save initial draft to storage too so can compare, add legal disclamier you own content you create.
    [ ] Add warning / instruction to add content like images etc
    [ ] Fix no option to save on mobile

image-handling
    Can you just use an on-page public API, eg unsplash?
    You could replace any image in worksheet with a button 'Choose image...' which brings up a modal allowing users to search images. You could pre-fill the search box with the alt tag.
    You could dynamically resize all images to a helpful (smallish) size - teacher can resize as they like
    You could block 'print' until all images have been inserted (or at least be like 'You haven't added images. Print anyway...', maybe less error prone)
    Or, You could simplify and just add it as a seperate component for now

### PUBILCITY (maybe all as 1 branch)
[ ] P1: Implement SEO practices following guides to improve search engine rankings
[ ] P1: Implement meta tags required for facebook without warnings
[ ] P1: Create a facebook page, add an initial post and basic content, then you can post there as you grow?
[ ] P2: Add CTA to give feedback to bottom of activity / lesson plan view. also link back to 'activities' for activity and 'my lessons' for lessons. Maybe 'your lessons' should be called 'my lessons'?

### CORE PRODUCT (seperate branches)
[ ] Identify and implement new DB structure to allow proposed growth ideas
    [ ] Timestamp lessons

[ ] Handle image generation 
[ ] Add EDIT btn with WYSIWYG editor P1?
[ ] Seperate lesson plan & handouts generation (checkbox 'generate handout activities' so users can decide if they want them or not? + 'Generate materials for this lesson' on other page to improve load times & decrease API costs)4
[ ] Plans & Activities not level / age appropriate particularly at the bottom end, too vague - NEED TO PROVIDE EXAMPLES OF GODO CONTENT AND FINE-TUNE GPT MODEL FOR THIS, can also start with split on beginner / int / advanced different prompts, could experiment with feeding like 'plan a free practice' then feed free practice and metadata, 'plan a controlled practice' - plan the lesson in an order that makes sense, feeding it it's generated content each time

## Feedback
[x] Remove kindy
    [x] From form
    [x] From library
[ ] Add class profile to initial form (can your students write? can your students read?) - AI will generate appropriate activities and exclude innapropriate activities for that particular class
[ ] Make localStorage limitations clear to users
[ ] Radio button to select generate handout -> button to generate handout
[ ] ... pictures, visual stories
[ ] ... Shared library of content with votes
[ ] ... More specificity for ouput generation
[ ] ... Improve design
[x] Radio btn for online teachers (maybe also group class vs 1-on-1), reply to redit u/AdrianAlucardTepes once implemented P1 IFF
[x] CEFR levels P1 IFF

## TODO
[ ] Improve load screen - can handle lesson plan + mats seperately, then display a green lesson plan created! generating materials ... for user experience of PROGRESS. Maybe also implement a TIMEOUT and display error screen if it takes like a minute?
[ ] Investigate improve markdown file load times?
[ ] Use CORS to prevent requests from other origins
[ ] Investigate using an iframe for better text-content-presentation-component display (closer to what will be printed) - can you make it a4 size? OR should you leave the /n in table as they seem to work well with the gram / vocab worksheet
[ ] Refactor shitty my activities logic and components, generic with lesson lib logic
[ ] Remove title from layout and create <TitleComponent>, standardize appearance across app
[ ] Put style tag on html for line heights so lines for students to write on look ok (see activity id rsilJnb1l3DM9jSgBPRo)
[ ] HTML output raw on find sb who - 1 time, iphone? https://www.easyplanesl.com/activity/1Xpt55Sq9H1ffyn7FP0k

[x] fix activities page loader flush with top component no padding P1 IFF
[x] Add Web Analytics (Vercel) https://vercel.com/aidansheehan/lesson-planner/analytics?environment=all P1 IFF


## BACKLOG
[ ] Implement star rating for lesson plans, save ratings to server too
[ ] Implement a dialog to request a second lesson plan - user can write their probs with lesson plan 1, generate a second, then choose which of the two plans to proceed with (for mats generation)
[ ] Revisit newsletter already subscribbed code 400 hack
[ ] Animate header menu (mobile)
[ ] Animate open lesson plan / open mats
[ ] Investigate better handling of raw HTML - can you process as close as possible to PDF?