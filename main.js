$(document).ready(function() {
  const CLIENT_ID = '8d4c2253d591142e1387';
  const CLIENT_SECRET = '433d9d69161e64ea5e834dd88e8ec31013770256';
  const BASE_URL = "https://api.github.com/users";
  let username = "CalebCraigo";
  const REPO_URL = "https://api.github.com/users/CalebCraigo/repos";
  // console.log(REPO_URL);
  const ORGS_URL = "https://api.github.com/users/CalebCraigo/orgs";

  let success = (res) => {
    console.log(res.data);
  }

  let request = $.ajax({
    method: "GET",
    url: `${BASE_URL}/${username}`,
    dataType: "jsonp",
    done: success,
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  });
console.log(request);
  // request.done(success);

  let profileAside = (res) => {
    // console.log(res.data);

    let source = $("#profileImg").html();
    let template = Handlebars.compile(source);
    let context = res.data;
    let html = template(context);
    $(".picborder").prepend(html);

    let nameSRC = $("#names").html();
    let nameTemp = Handlebars.compile(nameSRC);
    let nameContext = res.data;
    let nameHtml = nameTemp(nameContext);
    $(".names").prepend(nameHtml);

    let joinedSRC = $("#joined").html();
    let joinedTemp = Handlebars.compile(joinedSRC);
    let joinedContext = res.data;
    let joinedHtml = joinedTemp(joinedContext);
    $(".joined").prepend(joinedHtml);

  }
  request.done(profileAside);

  let orgs = $.ajax({
    method: "GET",
    url: `${ORGS_URL}`,
    dataType: "jsonp",
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  });

  let orgIcons = (res) => {
    console.log('here i am',res.data);

    let orgsSRC = $("#orgs").html();
    let orgsTemp = Handlebars.compile(orgsSRC);
    let orgsContext = {
      orgs: res.data
    };
    let orgsHtml = orgsTemp(orgsContext);
    console.log(orgsContext);
    $(".orgs").html(orgsHtml);
  }

  orgs.done(orgIcons);

  let navNums = $.ajax({
    method: "GET",
    url: `${BASE_URL}/${username}`,
    dataType: "jsonp",
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  });

  let nums = (res) => {

    let numsSRC = $("#nav").html();
    let numsTemp = Handlebars.compile(numsSRC);
    let numsContext = res.data;
    let numsHtml = numsTemp(numsContext);
    // console.log(numsContext);
    $("#navbar").html(numsHtml);
  }

  navNums.done(nums);

  let reposData = $.ajax({
    method: "GET",
    url: `${REPO_URL}`,
    dataType: "jsonp",
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  });

    let repos = (res) => {

      let reposSRC = $("#repos").html();
      let reposTemp = Handlebars.compile(reposSRC);
      let reposContext = {
        reposData: res.data
      };
      let reposHtml = reposTemp(reposContext);
      console.log(reposContext);
      $("main").append(reposHtml);
    }

    reposData.done(repos);



});
