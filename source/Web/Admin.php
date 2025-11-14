<?php

namespace Source\Web;

class Admin extends Controller
{
    public function __construct()
    {
        parent::__construct("admin");
    }

    public function home (array $data): void
    {
        echo $this->view->render("home", []);
    }

    public function clients (): void
    {
        echo $this->view->render("clients", []);
    }

}